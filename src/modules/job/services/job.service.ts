import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../user';
import { S3Service } from '@shared/services';
import { ICreateJob, IListJobs } from '../interfaces';
import { JobRepository } from '../repositories';
import { Types } from 'mongoose';

@Injectable()
export class JobService {
  constructor(
    private readonly jobRepository: JobRepository,
    private s3: S3Service,
  ) {}

  async createJob(payload: ICreateJob) {
    try {
      const {
        userId,
        media,
        projectOwnerMobile,
        projectOwnerWhatsapp,
        ...restPayload
      } = payload;

      // TODO: send review request link to project owner

      // Concurrent upload
      const uploadedMediaPromises = media.map(async (file) => {
        const fileUri = `jobs/${userId}/{uuid}`;
        const uploadedFile = await this.s3.uploadFile(file, fileUri);
        return uploadedFile.url;
      });

      // Wait for all media uploads to complete
      const uploadedMedia = await Promise.all(uploadedMediaPromises);

      return await this.jobRepository.create({
        userId,
        projectOwnerMobile,
        projectOwnerWhatsapp,
        ...restPayload,
        media: uploadedMedia,
      });
    } catch (error) {
      throw error;
    }
  }

  async updateJob(payload: { jobId: string; isVisible: boolean }) {
    try {
      const { jobId, ...restPayload } = payload;
      return await this.jobRepository.findOneAndUpdate(
        { _id: jobId },
        { $set: { ...restPayload } },
      );
    } catch (error) {
      throw error;
    }
  }

  async getJob(payload: { jobId: string }) {
    try {
      const { jobId } = payload;
      return await this.jobRepository.findOne({ _id: jobId });
    } catch (error) {
      throw error;
    }
  }
  async listJobs(payload: IListJobs) {
    try {
      const { userId, limit, offset } = payload;
      return await this.jobRepository.paginate({
        filterQuery: {
          userId: new Types.ObjectId(userId),
        },
        limit,
        offset,
      });
    } catch (error) {
      throw error;
    }
  }
}

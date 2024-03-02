import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../user';
import { S3Service } from '@shared/services';
import { ICreateJob } from '../interfaces';

@Injectable()
export class JobService {
  constructor(
    // private readonly professionRepository: ProfessionRepository,
    // private readonly cityRepository: CityRepository,
    private readonly userRepository: UserRepository,
    private s3: S3Service,
  ) {}

  async createJob(payload: ICreateJob) {
    try {
      const { userId, media } = payload;
      //   await this.userRepository.findOneAndUpdate(
      //     { _id: userId },
      //     {
      //       $set: { 'metadata.appLanguage': appLanguage },
      //     },
      //   );
      return null;
    } catch (error) {
      throw error;
    }
  }
}

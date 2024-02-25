import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { ResponseMessage, UserRole } from '@shared/constants';
import {
  IUpdateProviderProfile,
  IUpdateCustomerProfile,
  IListProviders,
} from '../interfaces';
import { S3Service } from '@shared/services';
import { Types } from 'mongoose';

@Injectable()
export class ProviderService {
  constructor(
    private readonly userRepository: UserRepository,
    private s3: S3Service,
  ) {}

  async get(payload: { userId: string }) {
    try {
      const { userId } = payload;

      return await this.userRepository.findOne(
        {
          _id: userId,
        },
        { password: 0, otp: 0 },
      );
    } catch (error) {
      throw error;
    }
  }

  async getProvider(payload: { userId: string }) {
    try {
      const { userId } = payload;

      return await this.userRepository.findOne(
        {
          _id: userId,
        },
        { password: 0, otp: 0 },
      );
    } catch (error) {
      throw error;
    }
  }

  async updateProfile(payload: IUpdateProviderProfile) {
    try {
      const { _id, ...restPayload } = payload;

      if (restPayload?.idPicture) {
        const url = `users/${_id}/identity/{uuid}`;
        restPayload.idPicture = (
          await this.s3.uploadFile(restPayload.idPicture, url)
        )?.url;
      }

      const response = await this.userRepository.findOneAndUpdate(
        {
          _id,
          role: UserRole.PROVIDER,
        },
        { $set: { serviceDetail: restPayload } },
        { projection: { serviceDetail: 1 } },
      );
      return response?.serviceDetail;
    } catch (error) {
      throw error;
    }
  }

  async listProviders(payload: IListProviders) {
    try {
      const { limit, offset, professionId } = payload;
      return await this.userRepository.paginate({
        filterQuery: {
          'serviceDetail.professionId': new Types.ObjectId(professionId),
        },
        limit,
        offset,
        projection: {
          name: 1,
          mobile: 1,
          username: 1,
          city: 1,
          profilePicture: 1,
          'serviceDetail.type': 1,
          'serviceDetail.serviceDescription': 1,
          'serviceDetail.yearsOfExperience': 1,
          'serviceDetail.whatsapp': 1,
          'serviceDetail.officeNumber': 1,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}

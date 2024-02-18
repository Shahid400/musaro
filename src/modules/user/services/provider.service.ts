import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { ResponseMessage, UserRole } from '@shared/constants';
import { IUpdateProviderProfile, IUpdateCustomerProfile } from '../interfaces';

@Injectable()
export class ProviderService {
  constructor(private readonly userRepository: UserRepository) {}

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
      const { userId, ...restPayload } = payload;

      const response = await this.userRepository.findOneAndUpdate(
        {
          _id: userId,
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
}

import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { ResponseMessage } from '@shared/constants';
import { IProviderProfile } from './interfaces';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

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

  async updateProviderProfile(payload: IProviderProfile) {
    try {
      const { userId, ...restPayload } = payload;

      return await this.userRepository.findOneAndUpdate(
        {
          _id: userId,
        },
        { $set: { serviceDetail: restPayload } },
      );
    } catch (error) {
      throw error;
    }
  }

  // async updateProviderProfile(payload: IUpdateProviderProfile) {
  //   try {
  //     const { userId, ...restPayload } = payload;

  //     return await this.userRepository.findOneAndUpdate(
  //       {
  //         _id: userId,
  //       },
  //       {
  //         $set: {
  //           serviceDetail: { ...restPayload },
  //         },
  //       },
  //     );
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  async findAll() {
    return `This action returns all user`;
  }

  async findOne(payload: any) {
    return await this.userRepository.findOne({ _id: payload?.id });
  }

  async update(id: number, updateUserDto: any) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

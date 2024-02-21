import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user';
import { IUpdateAppLanguage } from './interfaces';

@Injectable()
export class GeneralService {
  constructor(private readonly userRepository: UserRepository) {}

  async updateAppLanguage(payload: IUpdateAppLanguage) {
    try {
      const { userId, appLanguage } = payload;
      await this.userRepository.findOneAndUpdate(
        { _id: userId },
        {
          $set: { 'metadata.appLanguage': appLanguage },
        },
      );
      return null;
    } catch (error) {
      throw error;
    }
  }
}

import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../user';
import {
  ICreateProfession,
  IUpdateAppLanguage,
  IUpdateProfession,
} from '../interfaces';
import { S3Service } from '@shared/services';
import { ProfessionRepository } from '../repositories';

@Injectable()
export class GeneralService {
  constructor(
    private readonly professionRepository: ProfessionRepository,
    private readonly userRepository: UserRepository,
    private s3: S3Service,
  ) {}

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

  async createProfession(payload: ICreateProfession) {
    try {
      if (payload?.img) {
        const url = `profession/{uuid}`;
        payload.img = (await this.s3.uploadFile(payload.img, url))?.url;
      }
      return await this.professionRepository.create(payload);
    } catch (error) {
      throw error;
    }
  }

  async updateProfession(payload: IUpdateProfession) {
    try {
      return await this.professionRepository.updateProfession(payload);
    } catch (error) {
      throw error;
    }
  }

  async getProfession(payload: { professionId: string }) {
    try {
      const { professionId } = payload;
      return await this.professionRepository.findOne({ _id: professionId });
    } catch (error) {
      throw error;
    }
  }

  async listProfessions(payload: any) {
    try {
      const { limit, offset } = payload;
      return await this.professionRepository.paginate({ limit, offset });
    } catch (error) {
      throw error;
    }
  }
}

import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/user-req.dto';
import { UserRepository } from './user.repository';
import { ResponseMessage } from '@shared/constants';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll() {
    return `This action returns all user`;
  }

  async findOne(payload: any) {
    return await this.userRepository.findOne({ _id: payload?.id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

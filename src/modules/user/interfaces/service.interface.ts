import { CreateUserDto } from '../dto/user-res.dto';

export interface IUserService {
  create(createUserDto: CreateUserDto): Promise<any>;
  findAll(): any;
  findOne(id: number): any;
  update(id: number, updateUserDto: any): any;
  remove(id: number): any;
}

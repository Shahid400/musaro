import { CreateUserDto } from '../dto/user-res.dto';
import { UpdateUserDto } from '../dto/user-req.dto';

export interface IUserService {
  create(createUserDto: CreateUserDto): Promise<any>;
  findAll(): any;
  findOne(id: number): any;
  update(id: number, updateUserDto: UpdateUserDto): any;
  remove(id: number): any;
}

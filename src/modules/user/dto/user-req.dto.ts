import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './user-res.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}

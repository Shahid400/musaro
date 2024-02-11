import { ApiProperty } from '@nestjs/swagger';
import { ResponseMessage, UserRole } from '@shared/constants';
import { SameAs } from '@shared/utils';
import { IsNotEmpty, Matches } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: UserRole.CUSTOMER, enum: UserRole })
  @IsNotEmpty()
  role: string;

  @ApiProperty({ example: '' })
  @IsNotEmpty()
  mobile: string;

  @ApiProperty({ example: '' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: '' })
  @IsNotEmpty()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$&+,:;=?@#|'<>.^*()_%!-])[A-Za-z\d$&+,:;=?@#|'<>.^*()_%!-]{8,}$/,
    {
      message: ResponseMessage.INVALID_PASSWORD,
    },
  )
  password: string;

  @SameAs(`password`)
  passwordConfirmation: string;

  @ApiProperty({ example: '' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '' })
  @IsNotEmpty()
  city: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { AppLanguage } from '@shared/constants';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateAppLanguageReqDto {
  @ApiProperty({ example: AppLanguage.ENGLISH })
  @IsEnum(AppLanguage)
  @IsNotEmpty()
  appLanguage: string;
}

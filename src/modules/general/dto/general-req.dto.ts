import { ApiProperty } from '@nestjs/swagger';
import { AppLanguage } from '@shared/constants';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiSingleFile } from 'src/decorators';

export class UpdateAppLanguageReqDto {
  @ApiProperty({ example: AppLanguage.ENGLISH })
  @IsEnum(AppLanguage)
  @IsNotEmpty()
  appLanguage: string;
}

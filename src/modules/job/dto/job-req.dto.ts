import { ApiProperty } from '@nestjs/swagger';
import { MediaObject } from '@shared/interfaces';
import { Transform } from 'class-transformer';
import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator';
import { ApiMultipleFiles } from 'src/decorators';

export class CreateJobReqDto {
  @ApiProperty({ type: String, example: 'title', required: true })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ type: String, example: 'description', required: true })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ type: String, example: 'city', required: true })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiMultipleFiles({ required: true })
  media: Array<MediaObject>;
}

export class UpdateJobReqDto {}

import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from '@shared/dto';
import { MediaObject } from '@shared/interfaces';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { ApiMultipleFiles } from 'src/decorators';

export class JobAttachmentDto {
  media: Array<MediaObject>;
}
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

  @ApiProperty({ type: String, example: '123456789', required: true })
  @IsString()
  @IsNotEmpty()
  projectOwnerMobile: string;

  @ApiProperty({ type: String, example: '123456789', required: true })
  @IsString()
  @IsNotEmpty()
  projectOwnerWhatsapp: string;

  // @ApiProperty({ type: Array, example: [''], required: true })
  // @IsArray()
  // @IsNotEmpty()
  // media: string[];

  @ApiMultipleFiles({ required: true })
  attachments: Array<MediaObject>;
}

export class UpdateJobReqDto {
  @ApiProperty({ type: Boolean, example: false, required: true })
  @IsNotEmpty()
  @Type(() => Boolean)
  @IsBoolean()
  isVisible: boolean;
}

export class GetJobReqDto {
  @ApiProperty({ type: String, example: '', required: true })
  @IsMongoId()
  @IsNotEmpty()
  jobId: string;
}

export class ListJobsReqDto extends PaginationDto {
  @ApiProperty({ type: String, example: '', required: true })
  @IsMongoId()
  @IsNotEmpty()
  userId: string;
}

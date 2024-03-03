import { ApiProperty } from '@nestjs/swagger';
import { MediaObject } from '@shared/interfaces';
import { IsOptional, IsString } from 'class-validator';
import { ApiSingleFile } from 'src/decorators';

export class JobAttachmentDto {
  attachment: Array<MediaObject>;
}

export class CreateAttachmentReqDto {
  @ApiProperty({ type: String, example: '', required: false })
  @IsString()
  @IsOptional()
  module: string;

  @ApiSingleFile({ required: true })
  attachment: any;
}

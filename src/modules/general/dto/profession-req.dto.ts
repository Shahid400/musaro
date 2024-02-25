import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from '@shared/dto';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiSingleFile } from 'src/decorators';

export class CreateProfessionReqDto {
  @ApiProperty({ example: '' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiSingleFile({ required: true })
  img: any;
}

export class UpdateProfessionReqDto {
  @ApiProperty({ example: '', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: '', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiSingleFile({ required: false })
  img?: any;
}

export class ProfessionQueryReqDto {
  @ApiProperty({ example: '', required: true })
  @IsMongoId()
  @IsNotEmpty()
  professionId: string;
}

export class ListProfessionsReqDto extends PaginationDto {}

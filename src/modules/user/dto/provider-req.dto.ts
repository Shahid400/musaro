import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { ProviderType } from '@shared/constants';
import { ApiSingleFile } from 'src/decorators';
import { PaginationDto } from '@shared/dto';

export class UpdateProviderProfileReqDto {
  @ApiProperty({
    type: String,
    required: true,
    example: ProviderType.INDIVIDUAL,
  })
  @IsEnum(ProviderType)
  @IsNotEmpty()
  type: string;

  @ApiProperty({ type: String, required: true, example: '' })
  @IsMongoId()
  @IsNotEmpty()
  professionId: string;

  @ApiProperty({ type: String, required: true, example: '' })
  @IsString()
  @IsNotEmpty()
  businessName: string;

  @ApiProperty({ type: String, required: false, example: '' })
  @IsString()
  @IsOptional()
  city: string;

  @ApiProperty({ type: String, required: true, example: '' })
  @IsString()
  @IsNotEmpty()
  serviceDescription: string;

  @ApiProperty({ type: String, required: true, example: '' })
  @IsString()
  @IsNotEmpty()
  yearsOfExperience: string;

  @ApiProperty({ type: String, required: true, example: '' })
  @IsString()
  @IsNotEmpty()
  idNumber: string;

  @ApiProperty({ type: String, required: true, example: '' })
  @IsString()
  @IsNotEmpty()
  whatsapp: string;

  @ApiProperty({ type: String, required: false, example: '' })
  @IsString()
  @IsOptional()
  @ValidateIf((dto) => dto.type === ProviderType.ESTABLISHEDMENT)
  @IsNotEmpty()
  officeNumber?: string;

  @ApiSingleFile({ required: true })
  idPicture: any;
}

export class ListProvidersReqDto extends PaginationDto {
  @ApiProperty({ example: '', required: true })
  @IsMongoId()
  @IsNotEmpty()
  professionId: string;
}

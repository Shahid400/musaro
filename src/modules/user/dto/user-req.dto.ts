// import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, ValidateIf } from 'class-validator';
import { ProviderType } from '@shared/constants';

export class ProviderProfileReqDto {
  @ApiProperty({ type: String, example: ProviderType.INDIVIDUAL })
  @IsEnum(ProviderType)
  @IsNotEmpty()
  type: string;

  @ApiProperty({ type: String, example: '' })
  @IsString()
  @IsNotEmpty()
  service: string;

  @ApiProperty({ type: String, example: '' })
  @IsString()
  @IsNotEmpty()
  serviceDescription: string;

  @ApiProperty({ type: String, example: '' })
  @IsString()
  @IsNotEmpty()
  yearsOfExperience: string;

  @ApiProperty({ type: String, example: '' })
  @IsString()
  @IsNotEmpty()
  idNumber: string;

  @ApiProperty({ type: String, example: '' })
  @IsString()
  @IsNotEmpty()
  idPicture: string;

  @ApiProperty({ type: String, example: '' })
  @IsString()
  @IsNotEmpty()
  whatsapp: string;

  @ApiProperty({ type: String, example: '' })
  @IsString()
  @ValidateIf((dto) => dto.type === ProviderType.ESTABLISHEDMENT)
  @IsNotEmpty()
  officeNumber?: string;
}

// export class UpdateProviderProfileReqDto extends PartialType(
//   OmitType(ProviderProfileReqDto, ['type', 'service']),
// ) {}

import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsISO8601,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  Validate,
  ValidateIf,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  validate,
} from 'class-validator';
import { ProviderType } from '@shared/constants';
import { ApiSingleFile } from 'src/decorators';
import { PaginationDto } from '@shared/dto';
import { Transform, Type } from 'class-transformer';

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

@ValidatorConstraint({ name: 'isEndDateGreaterThanStartDate', async: false })
export class IsEndDateGreaterThanStartDateConstraint
  implements ValidatorConstraintInterface
{
  validate(value: any, args: ValidationArguments) {
    const startDate = args.object['unAvailableStartDate'];
    return value >= startDate;
  }

  defaultMessage(args: ValidationArguments) {
    return 'End date must be greater than or equal to start date';
  }
}

export class AvailabilityReqDto {
  @ApiProperty({ example: false, required: true })
  @IsNotEmpty()
  @IsBoolean()
  @Transform(({ obj, key }) => obj[key] === 'true')
  unAvailable: boolean;

  @ApiProperty({ type: String, example: '', required: false })
  @IsISO8601({ strict: true })
  @ValidateIf((dto) => dto.unAvailable == true)
  @IsNotEmpty()
  unAvailableStartDate: string;

  @ApiProperty({ type: String, example: '', required: false })
  @IsISO8601({ strict: true })
  @ValidateIf((dto) => dto.unAvailable == true)
  @IsNotEmpty()
  @Validate(IsEndDateGreaterThanStartDateConstraint)
  unAvailableEndDate: string;
}

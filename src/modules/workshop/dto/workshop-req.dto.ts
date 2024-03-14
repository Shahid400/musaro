import { ApiProperty } from '@nestjs/swagger';
import { PaymentOption, WorkshopStatus } from '@shared/constants';
import { PaginationDto } from '@shared/dto';
import { MediaObject } from '@shared/interfaces';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsISO8601,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiMultipleFiles } from 'src/decorators';

class WorkshopLocation {
  @ApiProperty({ type: String, example: '', required: true })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ type: String, example: '', required: true })
  @IsString()
  @IsNotEmpty()
  longitude: string;

  @ApiProperty({ type: String, example: '', required: true })
  @IsString()
  @IsNotEmpty()
  latitude: string;
}

export class CreateWorkshopReqDto {
  @ApiProperty({ type: String, example: '', required: true })
  @IsMongoId()
  @IsNotEmpty()
  planId: string;

  @ApiProperty({ type: String, example: '', required: true })
  @IsString()
  @IsNotEmpty()
  transactionId: string;

  @ApiProperty({ type: String, example: PaymentOption.VISA, required: true })
  @IsEnum(PaymentOption)
  @IsNotEmpty()
  paymentOption: string;

  @ApiProperty({ type: String, example: 'workshopName', required: true })
  @IsString()
  @IsNotEmpty()
  workshopName: string;

  @ApiProperty({ type: String, example: 'workshopName', required: true })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ type: String, example: 'workshopName', required: true })
  @IsString()
  @IsNotEmpty()
  pricePerPerson: string;

  @ApiProperty({ type: WorkshopLocation, required: true })
  @IsObject()
  @IsNotEmpty()
  @ValidateNested()
  location: WorkshopLocation;

  @ApiProperty({ type: Number, example: 50, required: true })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  maxPeople: number;

  @ApiProperty({ type: String, example: '2024-05-01', required: true })
  @IsISO8601()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({ type: String, example: '2024-06-01', required: true })
  @IsISO8601()
  @IsNotEmpty()
  endDate: string;

  @ApiMultipleFiles({ required: true })
  attachments: Array<MediaObject>;
}

export class WorkshopIdDto {
  @ApiProperty({ type: String, example: '', required: true })
  @IsMongoId()
  @IsNotEmpty()
  workshopId: string;
}

export class UpdateWorkshopReqDto {
  @ApiProperty({ type: String, example: WorkshopStatus.CLOSED, required: true })
  @IsNotEmpty()
  @IsEnum(WorkshopStatus)
  workshopStatus: string;
}

export class ListWorkshopReqDto extends PaginationDto {
  @ApiProperty({ type: String, example: '', required: false })
  @IsOptional()
  @IsMongoId()
  userId?: string;
}

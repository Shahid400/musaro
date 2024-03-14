import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Req,
  UploadedFiles,
  Get,
  Put,
  Query,
  Param,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ApiFormData, Auth } from 'src/decorators';
import { WorkshopService } from '../services/workshop.service';
import { MultipleAttachmentDto } from '@shared/dto';
import { CreateWorkshopReqDto, ListWorkshopReqDto, UpdateWorkshopReqDto, WorkshopIdDto } from '../dto';

@Controller('workshop')
@ApiTags('Workshop')
@ApiBearerAuth()
export class WorkshopController {
  constructor(private readonly workshopService: WorkshopService) {}

  @Auth()
  @Post()
  @ApiFormData({
    multiple: true,
    fieldName: 'media',
    fileTypes: ['png', 'jpeg', 'jpg', 'mp4', 'avi', 'mov'],
    errorMessage: 'Invalid file entered.',
    required: true,
    maxCount: 6,
  })
  @HttpCode(HttpStatus.CREATED)
  // @ApiCreatedResponse({ type: CreateWorkshopResDto })
  async createWorkshop(
    @Req() req: any,
    @Body() payload: CreateWorkshopReqDto,
    @UploadedFiles() { media }: MultipleAttachmentDto,
  ) {
    const userId = req?.user?._id;
    return this.workshopService.createWorkshop({
      userId,
      ...payload,
      media,
    });
  }

  @Auth()
  @Get('/list')
  @HttpCode(HttpStatus.OK)
  async listWorkshops(@Query() query: ListWorkshopReqDto) {
    return await this.workshopService.listWorkshops({ ...query });
  }

  @Auth()
  @Put('/:workshopId')
  @HttpCode(HttpStatus.OK)
  async updateWorkshop(
    @Param() param: WorkshopIdDto,
    @Body() payload: UpdateWorkshopReqDto,
  ) {
    return await this.workshopService.updateWorkshop({ ...param, ...payload });
  }

  @Auth()
  @Get('/:workshopId')
  @HttpCode(HttpStatus.OK)
  async getWorkshop(@Param() param: WorkshopIdDto) {
    return await this.workshopService.getWorkshop({ ...param });
  }
}

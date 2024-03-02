import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Req,
  UploadedFiles,
} from '@nestjs/common';
import { JobService } from '../services/job.service';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ApiFormData, Auth } from 'src/decorators';
import { CreateJobReqDto } from '../dto';
import { MediaObject } from '@shared/interfaces';

@Controller('job')
@ApiTags('Job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  // @Auth()
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
  // @ApiCreatedResponse({ type: GetProviderProfileResDto })
  async createJob(
    @Req() req: any,
    @Body() payload: CreateJobReqDto,
    @UploadedFiles() media: Array<MediaObject>,
  ) {
    return await this.jobService.createJob({
      userId: req?.user?._id,
      ...payload,
      media,
    });
  }
}

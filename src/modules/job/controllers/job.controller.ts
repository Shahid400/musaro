import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  Req,
  UploadedFiles,
  Put,
  Query,
} from '@nestjs/common';
import { JobService } from '../services/job.service';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ApiFormData, Auth } from 'src/decorators';
import {
  CreateJobReqDto,
  GetJobReqDto,
  ListJobsReqDto,
  UpdateJobReqDto,
} from '../dto';
import { MediaObject } from '@shared/interfaces';
import { MultipleAttachmentDto } from '@shared/dto';

@Controller('job')
@ApiTags('Job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

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
  // @ApiCreatedResponse({ type: CreateJobResDto })
  async createJob(
    @Req() req: any,
    @Body() payload: CreateJobReqDto,
    @UploadedFiles() { media }: MultipleAttachmentDto,
  ) {
    return await this.jobService.createJob({
      userId: req?.user?._id,
      ...payload,
      media,
    });
  }

  @Get('/list')
  @HttpCode(HttpStatus.OK)
  async listJobs(@Query() query: ListJobsReqDto) {
    return await this.jobService.listJobs({ ...query });
  }

  @Put('/:jobId')
  @HttpCode(HttpStatus.OK)
  async updateJob(
    @Param() param: GetJobReqDto,
    @Body() payload: UpdateJobReqDto,
  ) {
    return await this.jobService.updateJob({ ...param, ...payload });
  }

  @Get('/:jobId')
  @HttpCode(HttpStatus.OK)
  async getJob(@Param() param: GetJobReqDto) {
    return await this.jobService.getJob({ ...param });
  }
}

import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/decorators';
import { WorkshopService } from '../services/workshop.service';

@Controller('workshop')
@ApiTags('Workshop')
export class WorkshopController {
  constructor(private readonly workshopService: WorkshopService) {}

  @Auth()
  @Post('')
  @HttpCode(HttpStatus.OK)
  // @ApiCreatedResponse({ type: CreateWorkshopResDto })
  async createWorkshop(@Req() req: any, @Body() payload: any) {
    const userId = req?.user?._id;
    return this.workshopService.createWorkshop({ userId, ...payload });
  }
}

import {
  Controller,
  Get,
  Body,
  Req,
  HttpCode,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/decorators/auth.decorator';
import {
  GetProviderProfileResDto,
  UpdateProviderProfileReqDto,
  UpdateProviderProfileResDto,
} from '../dto';
import { ProviderService } from '../services';

@Controller('provider')
@ApiTags('Provider')
@ApiBearerAuth()
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  @Auth()
  @Put('profile')
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({ type: UpdateProviderProfileResDto })
  async updateProfile(
    @Req() req: any,
    @Body() payload: UpdateProviderProfileReqDto,
  ) {
    const { _id: userId } = req?.user;
    return await this.providerService.updateProfile({
      userId,
      ...payload,
    });
  }

  @Auth()
  @Get('profile')
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({ type: GetProviderProfileResDto })
  async get(@Req() req: any) {
    return await this.providerService.get({ userId: req?.user?._id });
  }
}

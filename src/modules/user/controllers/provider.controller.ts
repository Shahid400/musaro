import {
  Controller,
  Get,
  Body,
  Req,
  HttpCode,
  HttpStatus,
  Put,
  UploadedFile,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/decorators/auth.decorator';
import {
  GetProviderProfileResDto,
  UpdateProviderProfileReqDto,
  UpdateProviderProfileResDto,
} from '../dto';
import { ProviderService } from '../services';
import { ApiFormData } from 'src/decorators';

@Controller('provider')
@ApiTags('Provider')
@ApiBearerAuth()
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  @Auth()
  @Put('profile')
  @ApiFormData({
    single: true,
    fieldName: 'idPicture',
    fileTypes: ['png', 'jpeg', 'jpg'],
    errorMessage: 'Invalid image file entered.',
  })
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({ type: UpdateProviderProfileResDto })
  async updateProfile(
    @Req() req: any,
    @Body() payload: UpdateProviderProfileReqDto,
    @UploadedFile() idPicture: any,
  ) {
    const { _id } = req?.user;
    return await this.providerService.updateProfile({
      _id,
      idPicture,
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

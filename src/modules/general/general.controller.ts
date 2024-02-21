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
} from '@nestjs/common';
import { GeneralService } from './general.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/decorators';
import {
  UpdateAppLanguageReqDto,
  UpdateAppLanguageResDto,
} from './dto';

@Controller('general')
@ApiTags('General')
export class GeneralController {
  constructor(private readonly generalService: GeneralService) {}

  @Get('health-check')
  async healthCheck() {
    return {
      healthCheckPassed: true,
      healthCheck: 'Excellent',
    };
  }

  @ApiBearerAuth()
  @Auth()
  @Post('app-language')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UpdateAppLanguageResDto })
  async updateAppLanguage(
    @Req() req: any,
    @Body() payload: UpdateAppLanguageReqDto,
  ) {
    const userId = req?.user?._id;
    return await this.generalService.updateAppLanguage({ userId, ...payload });
  }
}

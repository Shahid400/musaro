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
  UploadedFile,
  Query,
} from '@nestjs/common';
import { GeneralService } from '../services/general.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ApiFormData, Auth } from 'src/decorators';
import {
  CreateProfessionReqDto,
  ListProfessionsReqDto,
  ProfessionQueryReqDto,
  UpdateAppLanguageReqDto,
  UpdateAppLanguageResDto,
  UpdateProfessionReqDto,
} from '../dto';

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

  // @ApiBearerAuth()
  // @Auth()
  @Post('profession')
  @ApiFormData({
    single: true,
    fieldName: 'img',
    fileTypes: ['png', 'jpeg', 'jpg'],
    errorMessage: 'Invalid image file entered.',
    required: true,
  })
  @HttpCode(HttpStatus.OK)
  async createProfession(
    @Body() payload: CreateProfessionReqDto,
    @UploadedFile() img: any,
  ) {
    return await this.generalService.createProfession({ img, ...payload });
  }

  // @ApiBearerAuth()
  // @Auth()
  @Patch('profession/:professionId')
  @ApiFormData({
    single: true,
    fieldName: 'img',
    fileTypes: ['png', 'jpeg', 'jpg'],
    errorMessage: 'Invalid image file entered.',
    required: false,
  })
  @HttpCode(HttpStatus.OK)
  async updateProfession(
    @Param() param: ProfessionQueryReqDto,
    @Body() payload: UpdateProfessionReqDto,
    @UploadedFile() img: any,
  ) {
    return await this.generalService.updateProfession({
      ...param,
      ...payload,
      img,
    });
  }

  @Get('profession/:professionId')
  @HttpCode(HttpStatus.OK)
  async getProfession(@Param() param: ProfessionQueryReqDto) {
    return await this.generalService.getProfession({ ...param });
  }

  @Get('professions')
  @HttpCode(HttpStatus.OK)
  async listProfessions(@Query() query: ListProfessionsReqDto) {
    return await this.generalService.listProfessions({ ...query });
  }
}

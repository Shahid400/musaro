import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Req,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { CreatePaymentReqDto, ListPaymentsQueryParamsDto, MoyasarCallbackDto } from '../dto';
import { PaymentService } from '../services/payment.service';
import { Auth } from 'src/decorators/auth.decorator';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@Controller('payment')
@ApiTags('Payment')
// @ApiBearerAuth()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  // @ApiCreatedResponse({ type: ResponseDto })
  async create(@Body() createPaymentDto: CreatePaymentReqDto) {
    return await this.paymentService.create(createPaymentDto);
  }

  @Get('payment-webhook')
  async processCallback(@Query() query: MoyasarCallbackDto): Promise<void> {
    await this.paymentService.processCallback(query);
  }

  // @Auth()
  @Get('list')
  @HttpCode(HttpStatus.OK)
  // @ApiCreatedResponse({ type: ResponseDto })
  async listPayments(
    @Req() req: any,
    @Query() query: ListPaymentsQueryParamsDto,
  ) {
    return await this.paymentService.listPayments(query);
  }

  @Get()
  findAll() {
    return this.paymentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePaymentDto: CreatePaymentReqDto,
  ) {
    return this.paymentService.update(+id, updatePaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(+id);
  }
}

import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { MoyasarConfigService } from '../utils';
import { Observable, firstValueFrom } from 'rxjs';
import { IListPaymentsQueryParams } from '../interfaces';
import { PaymentRepository } from '../repositories/payment.repository';
import { PaymentStatus } from '@shared/constants';

@Injectable()
export class PaymentService {
  constructor(
    private http: HttpService,
    private moyasarConfigService: MoyasarConfigService,
    private paymentRepository: PaymentRepository,
  ) { }

  async create(payload: any) {
    try {
      const requestConfig = this.moyasarConfigService.get(
        'POST',
        'payments',
        payload,
      );

      const { data } = await firstValueFrom(this.http.request(requestConfig));
      const paymentData = {
        userId: '65cab57d047f7ea9601da3a3',
        amount: payload?.amount,
        paymentOption: 'VISA',
        paymentType: 'SUBSCRIPTION',
        transactionId: data?.id,
        description: 'subscription fee',
        paymentDate: new Date(),
      };
      await this.paymentRepository.create(paymentData);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async processCallback(payload: any) {
    try {
      const { id, status, amount, message } = payload;
      return await this.paymentRepository.findOneAndUpdate(
        {
          transactionId: id,
        },
        { $set: { 
          paymentStatus: status === 'APPROVED' ? PaymentStatus.SUCCESS : PaymentStatus.FAILED,
          description: message
        } },
      );
    } catch (error) {
      throw error;
    }
  }

  async listPayments(payload: IListPaymentsQueryParams) {
    const queryParams = Object.entries(payload)
      .map(([key, value]) => (value != null ? `${key}=${value}` : ''))
      .filter(Boolean)
      .join('&');

    const urlPath = `/payments${queryParams ? `?${queryParams}` : ''}`;
    const requestConfig = this.moyasarConfigService.get('GET', urlPath);
    return await firstValueFrom(this.http.request(requestConfig));
  }

  findAll() {
    return `This action returns all payment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: any) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}

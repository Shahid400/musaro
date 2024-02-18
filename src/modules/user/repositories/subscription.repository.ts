import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@shared/abstracts';
import { Connection, Model } from 'mongoose';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { ISubscriptionRepository } from '../interfaces/repository.interface';
import { Subscription } from '../schemas/subscription.schema';

@Injectable()
export class SubscriptionRepository
  extends AbstractRepository<Subscription>
  implements ISubscriptionRepository<Subscription>
{
  protected readonly logger = new Logger(SubscriptionRepository.name);

  constructor(
    @InjectModel(Subscription.name) subscriptionModel: Model<Subscription>,
    @InjectConnection() connection: Connection,
  ) {
    super(subscriptionModel, connection);
  }
}

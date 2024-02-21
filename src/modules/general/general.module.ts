import { Module } from '@nestjs/common';
import { GeneralService } from './general.service';
import { GeneralController } from './general.controller';
import { UserModule } from '../user';

@Module({
  imports: [UserModule],
  controllers: [GeneralController],
  providers: [GeneralService],
})
export class GeneralModule {}

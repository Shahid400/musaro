import { Module } from '@nestjs/common';
import { GeneralService } from './services/general.service';
import { GeneralController } from './controllers/general.controller';
import { UserModule } from '../user';

@Module({
  imports: [UserModule],
  controllers: [GeneralController],
  providers: [GeneralService],
})
export class GeneralModule {}

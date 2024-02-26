import { Module } from '@nestjs/common';
import { GeneralService } from './services/general.service';
import { GeneralController } from './controllers/general.controller';
import { UserModule } from '../user';
import { SharedModule } from 'src/shared/shared.module';
import { MongooseModule } from '@nestjs/mongoose';
import { City, CitySchema, Profession, ProfessionSchema } from './schemas';
import { CityRepository, ProfessionRepository } from './repositories';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Profession.name, schema: ProfessionSchema },
      { name: City.name, schema: CitySchema },
    ]),
    SharedModule,
    UserModule,
  ],
  controllers: [GeneralController],
  providers: [GeneralService, ProfessionRepository, CityRepository],
})
export class GeneralModule {}

import { Module } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { CustomerService, ProviderService } from './services';
import { CustomerController, ProviderController } from './controllers';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  exports: [UserRepository],
  controllers: [CustomerController, ProviderController],
  providers: [CustomerService, ProviderService, UserRepository],
})
export class UserModule {}

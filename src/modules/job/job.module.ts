import { Module } from '@nestjs/common';
import { JobService } from './services/job.service';
import { JobController } from './controllers/job.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Job, JobSchema } from './schemas';
import { SharedModule } from 'src/shared/shared.module';
import { UserModule } from '../user';
import { JobRepository } from './repositories';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Job.name, schema: JobSchema }]),
    SharedModule,
    UserModule,
  ],
  controllers: [JobController],
  providers: [JobService, JobRepository],
})
export class JobModule {}

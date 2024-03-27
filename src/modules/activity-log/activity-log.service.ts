import { Injectable } from '@nestjs/common';
import { IActivityLogService } from './interfaces';
import { ActivityLogRepository } from './activity-log.repository';

@Injectable()
export class ActivityLogService implements IActivityLogService {
  constructor(private activityLogRepository: ActivityLogRepository) {}
}

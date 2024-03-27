import { ActivityLogType, DateRangeOption } from '@shared/constants';

export interface IFindByFilter {
  createdBy?: string;
  createdTo?: string;
  logType?: ActivityLogType;
  timestamp?: string;
  option?: DateRangeOption;
  startDate?: string;
  endDate?: string;
  isFilter?: boolean;
}

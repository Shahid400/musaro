import { MediaObject } from '@shared/interfaces';

export interface ICreateJob {
  userId: string;
  title: string;
  description: string;
  city: string;
  media: MediaObject[];
}

import { MediaObject } from '@shared/interfaces';

export interface ICreateJob {
  userId: string;
  title: string;
  description: string;
  city: string;
  projectOwnerMobile: string;
  projectOwnerWhatsapp: string;
  media: MediaObject[];
}

export interface IListJobs {
  userId: string;
  limit: number;
  offset: number;
}

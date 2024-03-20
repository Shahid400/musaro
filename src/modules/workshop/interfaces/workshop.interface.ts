import { MediaObject } from '@shared/interfaces';

export interface ICreateWorkshop {
  planId: string;
  transactionId: string;
  paymentOption: string;
  workshopName: string;
  city: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  pricePerPerson: string;
  maxPeople: number;
  description: string;
  location: {
    // address: string;
    longitude: string;
    latitude: string;
  };
  media: MediaObject[];
  userId: string;
}

export interface IListWorkshops {
  userId?: string;
  limit: number;
  offset: number;
}

import { MediaObject } from '@shared/interfaces';

export interface ICreateWorkshop {
  planId: string;
  transactionId: string;
  paymentOption: string;
  workshopName: string;
  description: string;
  pricePerPerson: string;
  location: {
    address: string;
    longitude: string;
    latitude: string;
  };
  maxPeople: number;
  startDate: string;
  endDate: string;
  media: MediaObject[];
  userId: string;
}

export interface IListWorkshops {
  userId?: string;
  limit: number;
  offset: number;
}
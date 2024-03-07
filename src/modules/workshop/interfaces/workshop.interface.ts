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
  media: [];
  userId: string;
}

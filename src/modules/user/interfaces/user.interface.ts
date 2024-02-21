export interface IUser {
  role: string;
  mobile: string;
  username: string;
  password: string;
  name: string;
  city: string;
}

export interface IUpdateProviderProfile {
  _id: string;
  type: string;
  service: string;
  serviceDescription: string;
  yearsOfExperience: string;
  idNumber: string;
  idPicture: string;
  whatsapp: string;
  officeNumber?: string;
}

export interface IUpdateCustomerProfile {
  userId: string;
  name?: string;
  username?: string;
  city?: string;
}

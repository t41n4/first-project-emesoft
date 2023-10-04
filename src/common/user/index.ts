export interface IGeolocation {
  lat: string;
  long: string;
}
export interface IAddress {
  city: string;
  street: string;
  number: number;
  zipcode: string;
  geolocation: IGeolocation;
}
export interface IName {
  firstname: string;
  lastname: string;
}
export interface IUser {
  id: number;
  email: string;
  username: string;
  password: string;
  name: {
    firstname: string;
    lastname: string;
  };
  address: {
    city: string;
    street: string;
    number: number;
    zipcode: string;
    geolocation: {
      lat: string;
      long: string;
    };
  };
  phone: number;
}

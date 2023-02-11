import { CITY, YEAR } from "../utils/enums";

export interface RegisterUserWrapper {
  username: string;
  name: string;
  dob: string;
  city: string;
  class: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  name: string;
  dob: string;
  city: CITY;
  class: YEAR;
  password: string;
  isAdmin: boolean;
  token: string;
}

export interface AuthWrapper {
  username: string;
  password: string;
}

export interface AttendanceWrapper {
  date: Date;
  users: string[];
}

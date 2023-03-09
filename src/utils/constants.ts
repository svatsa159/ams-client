import { RegisterUserWrapper, User } from "../models/models";
import { CITY, YEAR } from "./enums";

export const URL = "https://server-ams.onrender.com";

export const emptyUser: User = {
  _id: "",
  isAdmin: false,
  name: "",
  username: "",
  password: "",
  city: CITY.BLR,
  dob: "",
  class: YEAR.ONE,
  token: "",
};

export const emptyRegisterWrapper: RegisterUserWrapper = {
  name: "",
  username: "",
  password: "",
  city: CITY.BLR,
  dob: "",
  class: YEAR.ONE,
};

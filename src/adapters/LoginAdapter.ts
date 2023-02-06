import axios from "axios";
import { URL } from "../utils/constants";
import { RegisterUserWrapper, User } from "../models/models";

const getUser: (id: string) => User = (id: string) => {
  return {
    _id: "1",
    isAdmin: true,
    username: "admin",
    password: "admin",
    city: "",
    dob: "",
    class: "",
    name: "",
  };
};

const registerUser = async (registerWrapper: RegisterUserWrapper) => {
  const response = await axios.post(`${URL}/api/register`, registerWrapper);
  return response.data;
};

const loginUser = async (username: string, password: string) => {
  const response = await axios.post(`${URL}/api/login`, {
    username,
    password,
  });
  return response.data;
};

export { getUser, registerUser, loginUser };

import axios from "axios";
import { URL } from "../utils/constants";
import { RegisterUserWrapper, User } from "../models/models";

const getUser: (id: string, token: string) => Promise<User> = async (
  id,
  token
) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get(`${URL}/users/user`, config);
  return response.data;
};

export const getAllUsers: (token: string) => Promise<User[]> = async (
  token
) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get(`${URL}/users/all`, config);
  return response.data;
};

const registerUser = async (
  registerWrapper: RegisterUserWrapper,
  token: string
) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.post(`${URL}/auth/`, registerWrapper, config);
  return response.data;
};

const loginUser = async (username: string, password: string) => {
  const response = await axios.post(`${URL}/auth/login`, {
    username,
    password,
  });
  return {
    token: response.data,
  };
};

export { getUser, registerUser, loginUser };

import { createStore, action, Action, Thunk, thunk } from "easy-peasy";
import { getUser, loginUser } from "../adapters/AuthAdapter";
import { AuthWrapper } from "../models/models";
import jwt_decode from "jwt-decode";

interface User {
  _id: string;
  username: string;
  password: string;
  name: string;
  isAdmin: boolean;
  token: string;
}

export interface UserModel {
  user: User;
  setUser: Action<UserModel, User>;
  loginUser: Thunk<UserModel, AuthWrapper>;
  reLoginUser: Thunk<UserModel, string>;
}

const getDecodedAccessToken = (token: string): any => {
  try {
    return jwt_decode(token);
  } catch (Error) {
    return null;
  }
};

export const UserStore = createStore<UserModel>({
  user: {
    _id: "",
    isAdmin: false,
    name: "",
    username: "",
    password: "",
    token: "",
  },
  setUser: action((state, payload) => {
    state.user = payload;
  }),
  loginUser: thunk(async (action, payload) => {
    const response = await loginUser(payload.username, payload.password);
    const token = response.token;
    const decodedData = getDecodedAccessToken(token);
    console.log(decodedData);
    const id = decodedData.userId;
    const user = await getUser(id, token);
    window.localStorage.setItem("token", token);
    action.setUser({ ...user, token: token });
  }),
  reLoginUser: thunk(async (action, payload) => {
    const id = "1";
    const user = await getUser(id, payload);
    action.setUser({ ...user, token: payload });
  }),
});

import { createStore, action, Action } from "easy-peasy";

interface User {
  _id: string;
  username: string;
  password: string;
  name: string;
  isAdmin: boolean;
}

export interface UserModel {
  user: User;
  setUser: Action<UserModel, User>;
  // getUser: Thunk<UserModel, User>;
}

export const UserStore = createStore<UserModel>({
  user: {
    _id: "",
    isAdmin: false,
    name: "",
    username: "",
    password: "",
  },
  setUser: action((state, payload) => {
    state.user = payload;
  }),
});

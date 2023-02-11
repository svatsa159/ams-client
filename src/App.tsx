import React from "react";
import "./App.css";
import { StoreProvider } from "easy-peasy";
import { UserStore } from "./store/UserModel";
import Router from "./router";

const App = () => {
  return (
    <StoreProvider store={UserStore}>
      <Router />
    </StoreProvider>
  );
};

export default App;

import React from "react";
import "./Home.css";
import { useStoreState } from "easy-peasy";
import { UserModel } from "../../store";
import { useNavigate } from "react-router-dom";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  // Objects

  // Variables
  const user = useStoreState((state: UserModel) => state.user);
  const navigate = useNavigate();

  // State Variables - Hooks

  // Functions

  // Hook Functions

  React.useEffect(() => {
    console.log(user._id);
    if (user._id === "") {
      navigate("/login");
    }
  }, []);

  return <></>;
};

export default Home;

import React from "react";
import "./Login.css";
import { AuthWrapper } from "../../models/models";
import { useStoreActions, useStoreState } from "../../store/UserModelStore";
import { useNavigate } from "react-router-dom";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  // Objects
  const loginUser = useStoreActions((actions) => actions.loginUser);
  const user = useStoreState((state) => state.user);
  const reLoginUser = useStoreActions((action) => action.reLoginUser);
  const navigate = useNavigate();

  // Variables

  // State Variables - Hooks
  const [auth, setAuth] = React.useState<AuthWrapper>({
    password: "",
    username: "",
  });

  // Functions

  // Hook Functions
  React.useEffect(() => {
    if (user._id !== "") {
      navigate("/");
    } else if (
      window.localStorage.getItem("token") &&
      window.localStorage.getItem("token") !== ""
    ) {
      reLoginUser(window.localStorage.getItem("token")!);
    } else {
      navigate("/login");
    }
  }, [user]);

  return (
    <div
      className={
        "w-screen h-screen flex font-['Raleway'] bg-bg-blue text-white"
      }
    >
      <div className={"flex w-1/3 h-full justify-center items-center flex-col"}>
        <div className={"text-[30px] font-black mb-[20px]"}>AMS</div>
        <div className={"p-[10px]"}>Login</div>
        <div className={"my-[10px] w-1/2"}>
          <div className={"font-bold text-[10px]"}>Username</div>
          <div className={"mt-[5px] w-full"}>
            <input
              type={"text"}
              onChange={(e) => setAuth({ ...auth, username: e.target.value })}
              className={
                "text-black text-[12px] outline-none w-full px-[10px] py-[6px] rounded-[4px]"
              }
            />
          </div>
        </div>

        <div className={"my-[10px] w-1/2"}>
          <div className={"font-bold text-[10px]"}>Password</div>
          <div className={"mt-[5px] w-full"}>
            <input
              onChange={(e) => setAuth({ ...auth, password: e.target.value })}
              type={"password"}
              className={
                "text-black text-[12px] outline-none w-full px-[10px] py-[6px] rounded-[4px]"
              }
            />
          </div>
        </div>
        <div className={"my-[10px]"}>
          <button
            className={
              "mt-[5px] text-[12px] bg-primary cursor-pointer select-none rounded-[4px] px-[16px] py-[6px]"
            }
            onClick={async () => {
              await loginUser(auth);
              navigate("/");
            }}
          >
            Submit
          </button>
        </div>
      </div>
      <div className={"flex w-2/3 h-full"}>
        <img
          alt={"background"}
          src={"/assets/images/doodad.png"}
          width={"100%"}
        />
      </div>
    </div>
  );
};

export default Login;

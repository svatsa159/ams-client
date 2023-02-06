import React from "react";
import "./Login.css";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  // Objects

  // Variables

  // State Variables - Hooks

  // Functions

  // Hook Functions

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
              type={"password"}
              className={
                "text-black text-[12px] outline-none w-full px-[10px] py-[6px] rounded-[4px]"
              }
            />
          </div>
        </div>
        <div className={"my-[10px]"}>
          <div
            className={
              "mt-[5px] text-[12px] bg-primary cursor-pointer select-none rounded-[4px] px-[16px] py-[6px]"
            }
          >
            Submit
          </div>
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

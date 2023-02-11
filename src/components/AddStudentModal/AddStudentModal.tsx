import React from "react";
import "./AddStudentModal.css";
import { CITY, YEAR } from "../../utils/enums";
import Modal from "../Modal";
import { RegisterUserWrapper } from "../../models/models";

interface AddStudentModalProps {
  newUser: RegisterUserWrapper;
  setNewUser: React.Dispatch<React.SetStateAction<RegisterUserWrapper>>;
  nameRef: React.RefObject<HTMLInputElement>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  registerNewUser: () => Promise<void>;
}

const AddStudentModal: React.FC<AddStudentModalProps> = ({
  newUser,
  setNewUser,
  nameRef,
  setOpen,
  registerNewUser,
}) => {
  // Objects

  // Variables

  // State Variables - Hooks

  // Functions
  function getEnumKeyByEnumValue<T extends { [index: string]: string }>(
    myEnum: T,
    enumValue: string
  ): keyof T | null {
    let keys = Object.keys(myEnum).filter((x) => myEnum[x] === enumValue);
    return keys.length > 0 ? keys[0] : null;
  }

  // Hook Functions

  return (
    <Modal
      setOpen={setOpen}
      onSuccess={() => {
        registerNewUser();
      }}
    >
      <div className={"w-full"}>
        <div className={"font-bold text-[20px]"}>Add New Student</div>
        <form>
          <div className={"my-[30px] w-full"}>
            <div className={"font-bold text-[10px]"}>Name</div>
            <div className={"mt-[5px] w-full"}>
              <input
                type={"text"}
                ref={nameRef}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
                className={
                  "text-black bg-bg-blue bg-opacity-20 text-[12px] outline-none w-full px-[10px] py-[6px] rounded-[4px]"
                }
              />
            </div>
          </div>
          <div className={"my-[10px] w-full"}>
            <div className={"font-bold text-[10px]"}>Date of Birth</div>
            <div className={"mt-[5px] w-full"}>
              <input
                type={"date"}
                onChange={(e) =>
                  setNewUser({ ...newUser, dob: e.target.value })
                }
                className={
                  "text-black bg-bg-blue bg-opacity-10 text-[12px] outline-none px-[10px] py-[6px] rounded-[4px]"
                }
              />
            </div>
          </div>
          <div className={"my-[10px] w-full"}>
            <div className={"font-bold text-[10px]"}>City</div>
            <div className={"mt-[5px] w-full"}>
              <select
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    city: CITY[getEnumKeyByEnumValue(CITY, e.target.value)!],
                  })
                }
                className={
                  "active:border-blue border-2 border-solid text-black bg-bg-blue bg-opacity-10 text-[12px] outline-none px-[10px] py-[6px] rounded-[4px]"
                }
              >
                {Object.values(CITY).map((city) => {
                  return (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className={"my-[10px] w-full"}>
            <div className={"font-bold text-[10px]"}>Year</div>
            <div className={"mt-[5px] w-full"}>
              <select
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    class: YEAR[getEnumKeyByEnumValue(YEAR, e.target.value)!],
                  })
                }
                className={
                  "active:border-blue border-2 border-solid text-black bg-bg-blue bg-opacity-10 text-[12px] outline-none px-[10px] py-[6px] rounded-[4px]"
                }
              >
                {Object.values(YEAR).map((year) => {
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className={"my-[10px] w-full"}>
            <div className={"font-bold text-[10px]"}>Username</div>
            <div className={"mt-[5px] w-full"}>
              <input
                type={"text"}
                onChange={(e) =>
                  setNewUser({ ...newUser, username: e.target.value })
                }
                className={
                  "text-black bg-bg-blue bg-opacity-10 text-[12px] outline-none w-full px-[10px] py-[6px] rounded-[4px]"
                }
              />
            </div>
          </div>
          <div className={"my-[10px] w-full"}>
            <div className={"font-bold text-[10px]"}>Password</div>
            <div className={"mt-[5px] w-full"}>
              <input
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
                type={"password"}
                className={
                  "text-black bg-bg-blue bg-opacity-10 text-[12px] outline-none w-full px-[10px] py-[6px] rounded-[4px]"
                }
              />
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddStudentModal;

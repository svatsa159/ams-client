import React, { useRef } from "react";
import "./Home.css";
import MUIDataTable, { MUIDataTableColumnDef } from "mui-datatables";
import { useNavigate } from "react-router-dom";
import { useStoreActions, useStoreState } from "../../store/UserModelStore";
import { AiOutlineLogout, AiOutlineUserAdd } from "react-icons/ai";
import { RegisterUserWrapper, User } from "../../models/models";
import { emptyRegisterWrapper, emptyUser } from "../../utils/constants";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { registerUser, getAllUsers } from "../../adapters/AuthAdapter";
import AddStudentModal from "../../components/AddStudentModal";
import Calendar, { CalendarTileProperties } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  getStudentAttendance,
  markMultipleAttendance,
} from "../../adapters/AttendanceAdapter";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  // Objects
  const columns: MUIDataTableColumnDef[] = [
    {
      name: "name",
      label: "Name",
      options: {
        filter: false,
      },
    },
    { name: "class", label: "Year" },
    { name: "city", label: "City" },
    { name: "dob", label: "D.O.B" },
  ];

  // Variables
  const user = useStoreState((state) => state.user);
  const reLoginUser = useStoreActions((action) => action.reLoginUser);
  const setUser = useStoreActions((action) => action.setUser);
  const navigate = useNavigate();
  const getMuiTheme = () =>
    createTheme({
      typography: {
        fontFamily: "Raleway",
      },
      components: {
        MUIDataTable: {
          styleOverrides: {
            root: {
              backgroundColor: "#ffc4c4",
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              fontFamily: "Kanit",
            },
            elevation4: {
              width: "100%",
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            sizeMedium: {},
          },
        },
        MUIDataTableHeadCell: {
          styleOverrides: {
            root: {
              "&:first-of-type": {
                width: 20,
              },
            },
          },
        },
      },
    });

  // State Variables - Hooks
  const [open, setOpen] = React.useState(false);
  const [newUser, setNewUser] =
    React.useState<RegisterUserWrapper>(emptyRegisterWrapper);
  const [users, setUsers] = React.useState<User[]>([]);
  const nameRef = useRef<HTMLInputElement>(null);
  const [selectedStudents, setSelectedStudents] = React.useState<string[]>([]);
  const [DOA, setDOA] = React.useState("");
  const [invalidDate, setInvalidDate] = React.useState(false);
  const [data, setData] = React.useState<Partial<User>[]>([]);
  const [userAttendance, setUserAttendance] = React.useState<string[]>([]);

  // Functions
  const sameDay = (d1: Date, d2: Date) => {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  const userToPartialUser: (users: User[]) => Partial<User>[] = (
    users: User[]
  ) => {
    return users.map((user) => {
      return {
        _id: user._id,
        name: user.name,
        class: user.class,
        city: user.city,
        dob: user.dob,
      };
    });
  };
  const getAllUsersList = async () => {
    const allUsers = await getAllUsers(user.token);
    setUsers(allUsers);
  };
  const registerNewUser = async () => {
    await registerUser(newUser, user.token);
    await getAllUsersList();
    setOpen(false);
    setNewUser(emptyRegisterWrapper);
  };

  const markAttendance = async () => {
    if (DOA === "") {
      setInvalidDate(true);
    } else {
      setInvalidDate(false);
      await markMultipleAttendance(user.token, {
        date: new Date(DOA),
        users: selectedStudents,
      });
      console.log(selectedStudents);
      console.log(DOA);
      (
        document.getElementsByClassName(
          "PrivateSwitchBase-input"
        )[0] as HTMLDivElement
      ).click();
      setSelectedStudents([]);
      setDOA("");
    }
  };

  const logoutUser = () => {
    return () => {
      window.localStorage.removeItem("token");
      setUser(emptyUser);
      navigate("/login");
    };
  };

  // Hook Functions

  React.useEffect(() => {
    if (
      window.localStorage.getItem("token") &&
      window.localStorage.getItem("token") !== ""
    ) {
      reLoginUser(window.localStorage.getItem("token")!);
    } else {
      if (user._id === "") {
        navigate("/login");
      }
    }
  }, []);

  React.useEffect(() => {
    if (open) {
      nameRef.current!.focus();
    }
  }, [open]);

  React.useEffect(() => {
    if (user.token !== "" && user.isAdmin) {
      getAllUsersList().then((r) => {});
    } else if (user.token !== "" && !user.isAdmin) {
      getStudentAttendance(user.token, user._id).then((res) => {
        setUserAttendance(res);
      });
    }
  }, [user.token]);

  React.useEffect(() => {
    if (users.length > 0) {
      setData(userToPartialUser(users));
    }
  }, [users]);

  return (
    <div className={"flex w-screen h-screen flex-col bg-bg-blue-soft"}>
      <div
        className={
          "absolute top-0 left-0 p-[20px] flex justify-center text-bg-blue font-[Kanit] items-center text-[60px] font-bold"
        }
      >
        AMS {user.isAdmin ? "- Admin" : ""}
      </div>
      <div className={"flex h-[104px] p-[30px] items-end justify-end"}>
        {user.token !== "" && (
          <button
            onClick={logoutUser()}
            className={
              "flex py-[10px] px-[16px] items-center bg-white text-bg-blue rounded-[6px] hover:shadow"
            }
          >
            <AiOutlineLogout className={"font-bg-blue"} size={"16px"} />{" "}
            <span className={"ml-[8px] font-[12px]"}>Logout</span>
          </button>
        )}
      </div>
      {user.isAdmin && (
        <div className={"flex w-full p-[10px] justify-end"}>
          <button
            onClick={() => {
              setOpen(true);
            }}
            className={
              "flex py-[10px] px-[16px] items-center bg-white text-bg-blue rounded-[6px] mr-[20px] hover:shadow"
            }
          >
            <AiOutlineUserAdd size={"16px"} />{" "}
            <span className={"ml-[8px] font-[12px]"}>New Student</span>
          </button>
        </div>
      )}
      <div>
        {open && (
          <AddStudentModal
            newUser={newUser}
            setNewUser={setNewUser}
            nameRef={nameRef}
            setOpen={setOpen}
            registerNewUser={registerNewUser}
          />
        )}
      </div>
      {user.isAdmin && (
        <div className={"flex w-full items-center justify-center"}>
          <div className={"flex w-2/3 items-center justify-center p-[20px]"}>
            <ThemeProvider theme={getMuiTheme()}>
              <MUIDataTable
                title={"Student List"}
                data={data}
                columns={columns}
                options={{
                  filterType: "multiselect",
                  selectToolbarPlacement: "none",
                  onRowSelectionChange: (
                    currentRowsSelected,
                    allRowsSelected,
                    rowsSelected
                  ) => {
                    setSelectedStudents(
                      allRowsSelected.map((f) => data[f.dataIndex]._id!)
                    );
                  },
                }}
              />
            </ThemeProvider>
          </div>
        </div>
      )}
      {user.isAdmin && selectedStudents.length > 0 && (
        <div className={"flex flex-row justify-center"}>
          <div
            className={
              "flex w-2/3 items-center justify-end p-[20px] bg-white rounded-[8px] shadow"
            }
          >
            <div
              className={"flex justify-center items-center flex-col mr-[20px]"}
            >
              <div className={"font-bold text-[10px]"}>Date of Attendance</div>
              <input
                type={"date"}
                onChange={(e) => {
                  if (e.target.value !== "") {
                    setInvalidDate(false);
                  }
                  setDOA(e.target.value);
                }}
                className={`text-black bg-bg-blue bg-opacity-10 text-[12px] outline-none px-[10px] py-[6px] rounded-[4px] ${
                  invalidDate ? "border-[1px] border-solid border-red-300" : ""
                }`}
              />
            </div>
            <div
              className={
                "flex px-[16px] py-[10px] h-full bg-white cursor-pointer bg-bg-blue-soft rounded-[8px] hover:shadow"
              }
              onClick={() => {
                markAttendance();
              }}
            >
              Mark Attendance for {selectedStudents.length} User
              {selectedStudents.length === 1 ? "" : "s"}
            </div>
          </div>
        </div>
      )}
      {user.token !== "" && !user.isAdmin && (
        <>
          <div
            className={
              "flex my-[20px] justify-center items-center font-semibold text-bg-blue text-[28px]"
            }
          >
            Attendance Dashboard
          </div>
          <div className={"flex justify-center"}>
            <Calendar
              className={"w-1/3"}
              tileClassName={(props: CalendarTileProperties) => {
                if (
                  props.view === "month" &&
                  props.date.getDay() !== 0 &&
                  props.date.getDay() !== 6 &&
                  props.date <= new Date()
                ) {
                  if (
                    userAttendance.some((a) => sameDay(new Date(a), props.date))
                  ) {
                    return "attendance-present";
                  } else {
                    return "attendance-absent";
                  }
                } else return "";
              }}
            />
          </div>
          <div className={"flex mt-[20px]"}>
            <div className={"flex flex-grow"} />
            <div
              className={
                "flex bg-[#b2dc6a] px-[10px] justify-center items-center text-[10px] py-[6px] rounded-[4px]"
              }
            >
              Present
            </div>
            <div className={"flex w-[20px]"} />
            <div
              className={
                "flex bg-[#dc6a6a] px-[10px] justify-center items-center text-[10px] py-[6px] rounded-[4px]"
              }
            >
              Absent
            </div>
            <div className={"flex flex-grow"} />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;

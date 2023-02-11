import axios from "axios";
import { URL } from "../utils/constants";
import { AttendanceWrapper } from "../models/models";

export const markMultipleAttendance: (
  token: string,
  wrapper: AttendanceWrapper
) => Promise<void> = async (token, wrapper) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.post(`${URL}/attendance/`, wrapper, config);
  return response.data;
};

export const getStudentAttendance: (
  token: string,
  id: string
) => Promise<string[]> = async (token, id) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get(`${URL}/attendance/${id}`, config);
  return response.data;
};

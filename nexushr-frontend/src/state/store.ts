import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import dashboardSlice from "./dashboardSlice";
import employeeSlice from "./employeeSlice";
import departmentSlice from "./departmentSlice";
import payrollSlice from "./payrollSlice";
import attendanceSlice from "./attendanceSlice";
import monthlyAttendanceSlice from "./monthlyAttendanceSlice";
import leaveSlice from "./leaveSlice"

import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";

const rootReducer = combineReducers({
  auth: authSlice,
  dashboard: dashboardSlice,
  employee: employeeSlice,
  department: departmentSlice,
  payroll: payrollSlice,
  attendance: attendanceSlice,
  monthlyAttendance: monthlyAttendanceSlice,
  leave: leaveSlice
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;

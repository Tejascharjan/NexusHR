import MonthlyAttendanceFilter from "@/components/attendance/MonthlyAttendanceFilter";
import MonthlyAttendanceTable from "@/components/attendance/MonthlyAttendanceTable";
import { getMonthlyAttendance } from "@/state/monthlyAttendanceSlice";
import { useAppDispatch, useAppSelector } from "@/state/store";
import { useEffect, useState } from "react";

const MonthlyAttendancePage = () => {
  const dispatch = useAppDispatch();
  const { monthlyAttendance, department } = useAppSelector((store) => store);
  const today = new Date();
  const [filters, setFilters] = useState({ month: today.getMonth() + 1, year: today.getFullYear(), departmentId: undefined, page: 0, size: 10 });

  useEffect(() => {
    dispatch(getMonthlyAttendance(filters));
  }, [dispatch, filters]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Monthly Attendance</h1>
        <p className="text-text-secondary mt-1">View employee attendance summary by month</p>
      </div>

      <MonthlyAttendanceFilter filters={filters} departments={department.departments} onChange={setFilters} />

      <MonthlyAttendanceTable attendance={monthlyAttendance.attendance} />
    </div>
  );
};

export default MonthlyAttendancePage;

import { useAppDispatch, useAppSelector } from "@/state/store";
import InputField from "../common/InputField";
import SelectField from "../common/SelectField";
import { useEffect, useState } from "react";
import { filterAttendance } from "@/state/attendanceSlice";

const AttendanceFilters = ({ isAdmin }: { isAdmin: boolean }) => {
  const dispatch = useAppDispatch();
  const { employee, department } = useAppSelector((store) => store);
  const today = new Date().toISOString().split("T")[0];

  const [filters, setFilters] = useState({
    date: today,
    status: "",
    departmentId: "",
    employeeId: "",
  });

  useEffect(() => {
    dispatch(
      filterAttendance({
        date: filters.date || null,
        status: filters.status || null,
        departmentId: filters.departmentId ? Number(filters.departmentId) : null,
        employeeId: filters.employeeId ? Number(filters.employeeId) : null,
      }),
    );
  }, [dispatch, filters]);

  return (
    <div className="bg-card-bg border border-slate-800 rounded-2xl p-6">
      <div className="grid md:grid-cols-4 gap-4">
        <InputField type="date" value={filters.date} onChange={(e) => setFilters({ ...filters, date: e.target.value })} label="Date" />

        <SelectField value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })} label="Status">
          <option value="">All</option>
          <option value="PRESENT">PRESENT</option>
          <option value="ABSENT">ABSENT</option>
          <option value="LATE">LATE</option>
        </SelectField>

        {isAdmin && (
          <SelectField value={filters.departmentId} onChange={(e) => setFilters({ ...filters, departmentId: e.target.value })} label="Department">
            <option value="">All</option>
            {department?.departments?.map((department) => (
              <option key={department.id} value={department.id}>
                {department.name}
              </option>
            ))}
          </SelectField>
        )}

        {isAdmin && (
          <SelectField label="Employee" value={filters.employeeId} onChange={(e) => setFilters({ ...filters, employeeId: e.target.value })}>
            <option value="">All</option>
            {employee?.employees?.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.firstName} {emp.lastName}
              </option>
            ))}
          </SelectField>
        )}
      </div>
    </div>
  );
};

export default AttendanceFilters;

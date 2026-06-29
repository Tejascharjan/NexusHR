import { useEffect, useState } from "react";
import InputField from "@/components/common/InputField";
import SelectField from "@/components/common/SelectField";
import { useAppDispatch } from "@/state/store";
import { filterLeaves } from "@/state/leaveSlice";
import type { Employee } from "@/types/EmployeeTypes";

interface LeaveFilterProps {
  isAdmin: boolean;
  employees: Employee[];
}

const LeaveFilter = ({ isAdmin, employees }: LeaveFilterProps) => {
  const dispatch = useAppDispatch();

  const today = new Date().toISOString().split("T")[0];

  const [filters, setFilters] = useState({
    date: today,
    status: "",
    employeeId: "",
  });

  useEffect(() => {
    dispatch(
      filterLeaves({
        date: filters.date || null,
        status: filters.status || null,
        employeeId: filters.employeeId ? Number(filters.employeeId) : null,
        page: 0,
        size: 10,
      }),
    );
  }, [filters, dispatch]);

  return (
    <div className="bg-card-bg border border-slate-800 rounded-2xl p-6">
      <h2 className="text-lg font-semibold text-white mb-6">Filter Leave Requests</h2>

      <div className={`grid gap-5 ${isAdmin ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
        <InputField
          label="Date"
          type="date"
          value={filters.date}
          onChange={(e) =>
            setFilters({
              ...filters,
              date: e.target.value,
            })
          }
        />

        <SelectField label="Status" value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
          <option value="">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
          <option value="CANCELLED">Cancelled</option>
        </SelectField>

        {isAdmin && (
          <SelectField label="Employee" value={filters.employeeId} onChange={(e) => setFilters({ ...filters, employeeId: e.target.value })}>
            <option value="">All Employees</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.firstName} {employee.lastName}
              </option>
            ))}
          </SelectField>
        )}
      </div>
    </div>
  );
};

export default LeaveFilter;

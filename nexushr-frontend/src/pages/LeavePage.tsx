import LeaveFilter from "@/components/leave/LeaveFilter";
import LeaveTable from "@/components/leave/LeaveTable";
import { getAllEmployees } from "@/state/employeeSlice";
import { useAppDispatch, useAppSelector } from "@/state/store";
import { useEffect } from "react";

const LeavePage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllEmployees());
  }, [dispatch]);

  const { user } = useAppSelector((state) => state.auth);
  const { employees } = useAppSelector((state) => state.employee);

  const isAdmin = user?.role === "ADMIN" || user?.role === "EMPLOYEE";

  return (
    <div className="space-y-6">
      <LeaveFilter isAdmin={isAdmin} employees={employees} />

      <LeaveTable isAdmin={isAdmin} />
    </div>
  );
};

export default LeavePage;

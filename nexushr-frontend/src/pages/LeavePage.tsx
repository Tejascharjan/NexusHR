import ApplyLeaveForm from "@/components/leave/ApplyLeaveForm";
import LeaveFilter from "@/components/leave/LeaveFilter";
import LeaveTable from "@/components/leave/LeaveTable";
import { getAllEmployees, getEmployeeById } from "@/state/employeeSlice";
import { getEmployeeLeave } from "@/state/leaveSlice";
import { useAppDispatch, useAppSelector } from "@/state/store";
import { useEffect } from "react";

const LeavePage = () => {
  const dispatch = useAppDispatch();
  const { leaves } = useAppSelector((state) => state.leave);
  const { employees } = useAppSelector((state) => state.employee);

  const { user } = useAppSelector((state) => state.auth);
  const isAdmin = user?.role === "ADMIN" || user?.role === "MANAGER";

  useEffect(() => {
    if (!user) return;

    if (isAdmin) {
      dispatch(getAllEmployees());
    } else {
      dispatch(getEmployeeById());
      dispatch(
        getEmployeeLeave({
          employeeId: user.id,
        }),
      );
    }
  }, [dispatch, user]);

  return (
    <div className="space-y-6">
      {user?.role == "EMPLOYEE" && <ApplyLeaveForm employees={employees} />}
      {user?.role != "EMPLOYEE" && <LeaveFilter isAdmin={isAdmin} employees={employees} />}

      <LeaveTable isAdmin={isAdmin} leaves={leaves} />
    </div>
  );
};

export default LeavePage;

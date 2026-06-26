import DashboardLayout from "@/components/common/DashboardLayout";
import EmployeeForm from "@/components/employee/EmployeeForm";
import AttendancePage from "@/pages/AttendancePage";
import DashboardPage from "@/pages/DashboardPage";
import DepartmentPage from "@/pages/DepartmentPage";
import EmployeePage from "@/pages/EmployeePage";
import LeavePage from "@/pages/LeavePage";
import MonthlyAttendancePage from "@/pages/MonthlyAttendancePage";
import PayrollPage from "@/pages/PayrollPage";
import { Route, Routes } from "react-router-dom";

const AdminRouters = () => {
  return (
    <div>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="employees" element={<EmployeePage />} />
          <Route path="add-employee" element={<EmployeeForm />} />
          <Route path="departments" element={<DepartmentPage />} />
          <Route path="attendance" element={<AttendancePage />} />
          <Route path="monthly-attendance" element={<MonthlyAttendancePage />} />
          <Route path="leaves" element={<LeavePage />} />
          <Route path="payroll" element={<PayrollPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default AdminRouters;

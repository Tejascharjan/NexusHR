import EmployeeForm from "@/components/employee/EmployeeForm";
import DashboardLayout from "@/layouts/DashboardLayout";
import AttendancePage from "@/pages/admin/AttendancePage";
import DashboardPage from "@/pages/admin/DashboardPage";
import DepartmentPage from "@/pages/admin/DepartmentPage";
import EmployeePage from "@/pages/admin/EmployeePage";
import LeavePage from "@/pages/admin/LeavePage";
import MonthlyAttendancePage from "@/pages/admin/MonthlyAttendancePage";
import PayrollPage from "@/pages/admin/PayrollPage";
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

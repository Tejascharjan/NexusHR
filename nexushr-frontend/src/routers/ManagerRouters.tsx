import DashboardLayout from "@/components/common/DashboardLayout";
import AttendancePage from "@/pages/AttendancePage";
import DashboardPage from "@/pages/DashboardPage";
import DepartmentPage from "@/pages/DepartmentPage";
import EmployeePage from "@/pages/EmployeePage";
import LeavePage from "@/pages/LeavePage";
import { Route, Routes } from "react-router-dom";

const ManagerRouters = () => {
  return (
    <div>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="departments" element={<DepartmentPage />} />
          <Route path="employees" element={<EmployeePage />} />
          <Route path="attendance" element={<AttendancePage />} />
          <Route path="leaves" element={<LeavePage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default ManagerRouters;

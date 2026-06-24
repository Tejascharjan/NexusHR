import DashboardLayout from "@/layouts/DashboardLayout";
import EmployeePage from "@/pages/admin/EmployeePage";

import { Route, Routes } from "react-router-dom";

const EmployeeRouters = () => {
  return (
    <div>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="dashboard" element={<EmployeePage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default EmployeeRouters;

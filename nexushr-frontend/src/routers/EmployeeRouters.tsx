import DashboardLayout from "@/components/common/DashboardLayout";
import LeavePage from "@/pages/LeavePage";
import MyProfile from "@/pages/MyProfile";
import PayrollPage from "@/pages/PayrollPage";
import { Route, Routes } from "react-router-dom";

const EmployeeRouters = () => {
  return (
    <div>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="profile" element={<MyProfile />} />
          <Route path="leaves" element={<LeavePage />} />
          <Route path="payroll" element={<PayrollPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default EmployeeRouters;

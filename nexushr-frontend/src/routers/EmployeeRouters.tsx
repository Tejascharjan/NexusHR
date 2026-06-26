import DashboardLayout from "@/components/common/DashboardLayout";
import AttendancePage from "@/pages/AttendancePage";
import DashboardPage from "@/pages/DashboardPage";
import MyLeavePage from "@/pages/MyLeavePage";
import MyProfile from "@/pages/MyProfile";
import { Route, Routes } from "react-router-dom";

const EmployeeRouters = () => {
  return (
    <div>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="profile" element={<MyProfile />} />
          <Route path="attendance" element={<AttendancePage />} />
          <Route path="leaves" element={<MyLeavePage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default EmployeeRouters;

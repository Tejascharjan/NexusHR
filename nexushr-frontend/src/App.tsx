import { useEffect } from "react";
import "./App.css";
import { useAppDispatch } from "./state/store";
import { fetchUserProfile } from "./state/authSlice";
import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./routers/ProtectedRoutes";
import AdminRouters from "./routers/AdminRouters";
import EmployeeRouters from "./routers/EmployeeRouters";
import Homepage from "./pages/Homepage";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch]);

  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Homepage />} />

        <Route
          path="/admin/*"
          element={
            <ProtectedRoutes allowedRoles={["ADMIN"]}>
              <AdminRouters />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/manager/*"
          element={
            <ProtectedRoutes allowedRoles={["MANAGER"]}>
              <div>Manager Routes</div>
            </ProtectedRoutes>
          }
        />

        <Route
          path="/employee/*"
          element={
            <ProtectedRoutes allowedRoles={["EMPLOYEE"]}>
              <EmployeeRouters />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

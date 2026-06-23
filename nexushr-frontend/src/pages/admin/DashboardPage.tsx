import DashboardOverview from "@/components/dashboard/DashboardOverview";
import { fetchGlobalAdminMetrics } from "@/state/dashboardSlice";

import { useAppDispatch, useAppSelector } from "@/state/store";
import { useEffect } from "react";

const DashboardPage = () => {
  const { user } = useAppSelector((store) => store.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user?.role) {
      dispatch(fetchGlobalAdminMetrics());
    }
  }, [user]);

  return <DashboardOverview />;
};

export default DashboardPage;

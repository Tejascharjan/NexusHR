import { useEffect } from "react";

import DepartmentChart from "./DepartmentChart";
import RecentActivities from "./RecentActivities";
import StatsCards from "./StatsCards";

import { getDashboard } from "@/state/dashboardSlice";
import { useAppDispatch, useAppSelector } from "@/state/store";
import AttendanceChart from "./AttendanceChart";
import PayrollChart from "./PayrollChart";
import RecentEmployees from "./RecentEmployees";
import PendingLeaves from "./PendingLeaves";

const DashboardOverview = () => {
  const dispatch = useAppDispatch();

  const { dashboard, loading, error } = useAppSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(getDashboard());
  }, [dispatch]);

  if (loading) {
    return <div className="flex items-center justify-center h-[60vh] text-slate-400">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-red-400">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <StatsCards dashboard={dashboard} />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <AttendanceChart data={dashboard?.attendanceTrend ?? []} />
        </div>

        <DepartmentChart data={dashboard?.departmentDistribution ?? []} />
      </div>
      <div className="grid xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <PayrollChart data={dashboard?.payrollTrend ?? []} />
        </div>

        <RecentActivities activities={dashboard?.recentActivities ?? []} />
      </div>
      <div className="grid xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <RecentEmployees employees={dashboard?.recentEmployees ?? []} />
        </div>

        <PendingLeaves leaves={dashboard?.pendingLeavesList ?? []} />
      </div>
    </div>
  );
};

export default DashboardOverview;

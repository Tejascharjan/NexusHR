import StatsCards from "./StatsCards";
import RecentActivities from "./RecentActivities";
import DepartmentChart from "./DepartmentChart";

const DashboardOverview = () => {
  return (
    <div className="space-y-6">
      <StatsCards />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <DepartmentChart />
        </div>

        <RecentActivities />
      </div>
    </div>
  );
};

export default DashboardOverview;

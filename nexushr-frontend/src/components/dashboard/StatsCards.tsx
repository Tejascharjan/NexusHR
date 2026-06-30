import { DASHBOARD_STATS_CONFIG } from "@/config/dashboard";
import { useAppSelector } from "@/state/store";
import type { DashboardResponse } from "@/types/DashboardTypes";

interface StatsCardsProps {
  dashboard: DashboardResponse | null;
}

const StatsCards = ({ dashboard }: StatsCardsProps) => {
  const { user } = useAppSelector((state) => state.auth);

  const role = user?.role || "EMPLOYEE";

  const cards = DASHBOARD_STATS_CONFIG[role as keyof typeof DASHBOARD_STATS_CONFIG];

  const getValue = (key: string) => {
    if (!dashboard) return 0;

    switch (key) {
      case "totalEmployees":
        return dashboard?.totalEmployees;

      case "totalDepartments":
        return dashboard.totalDepartments;

      case "presentToday":
        return dashboard.presentToday;

      case "absentToday":
        return dashboard.absentToday;

      case "pendingLeaves":
        return dashboard.pendingLeaves;

      case "currentMonthPayroll":
        return `₹${(dashboard.currentMonthPayroll / 100000).toFixed(1)}L`;

      default:
        return 0;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div key={card.key} className="bg-card-bg border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">{card.title}</p>

                <h2 className="text-3xl font-bold mt-2 text-white">{getValue(card.key)}</h2>
              </div>

              <div className="h-12 w-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                <Icon className="h-6 w-6 text-orange-500" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;

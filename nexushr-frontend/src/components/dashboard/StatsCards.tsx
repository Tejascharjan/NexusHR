import { DASHBOARD_STATS_CONFIG } from "@/config/dashboard";
import { useAppSelector } from "@/state/store";

const StatsCards = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { stats } = useAppSelector((store) => store.dashboard);

  const role = user?.role || "EMPLOYEE";
  const cards =
    DASHBOARD_STATS_CONFIG[role as keyof typeof DASHBOARD_STATS_CONFIG];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card) => {
        const Icon = card.icon;
        let value = stats?.[card.key] || 0;

        if (card.key === "totalPayroll") {
          value = `₹${(value / 100000).toFixed(1)}L`;
        }

        if (card.key === "attendancePercentage") {
          value = `${value}%`;
        }

        return (
          <div
            key={card.key}
            className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6"
          >
            <div className="flex justify-between">
              <div>
                <p className="text-slate-400 text-sm">{card.title}</p>

                <h2 className="text-3xl font-bold mt-2">{value}</h2>
              </div>

              <div
                className="
                h-12
                w-12
                rounded-xl
                bg-orange-500/10
                flex
                items-center
                justify-center
                "
              >
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

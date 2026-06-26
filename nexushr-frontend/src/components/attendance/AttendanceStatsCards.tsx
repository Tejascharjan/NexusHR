import { ATTENDANCE_STATS_CONFIG } from "@/config/attendance";

const stats = {
  present: 42,
  absent: 6,
  late: 8,
  workedHours: 326,
};

const AttendanceStatsCards = ({ isAdmin }: { isAdmin: boolean }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {ATTENDANCE_STATS_CONFIG.map((card) => {
        const Icon = card.icon;

        return (
          <div key={card.key} className="bg-card-bg border border-slate-800 rounded-2xl p-6">
            <div className="flex justify-between">
              <div>
                <p className="text-slate-400 text-sm">{card.title}</p>

                <h2 className="text-3xl font-bold mt-2 text-white">{stats[card.key as keyof typeof stats]}</h2>
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

export default AttendanceStatsCards;

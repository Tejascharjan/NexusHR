import { Calendar, CreditCard, UserPlus, Clock, FileCheck } from "lucide-react";

import type { Activity } from "@/types/DashboardTypes";

interface RecentActivitiesProps {
  activities: Activity[];
}

const RecentActivities = ({ activities }: RecentActivitiesProps) => {
  const getIcon = (type: string) => {
    switch (type) {
      case "PAYROLL":
        return <CreditCard className="h-4 w-4 text-orange-500" />;

      case "LEAVE":
        return <Calendar className="h-4 w-4 text-green-500" />;

      case "EMPLOYEE":
        return <UserPlus className="h-4 w-4 text-blue-500" />;

      default:
        return <FileCheck className="h-4 w-4 text-slate-400" />;
    }
  };

  return (
    <div className="bg-card-bg border border-slate-800 rounded-2xl p-6 h-full">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white">Recent Activities</h3>

        <p className="text-sm text-slate-400">Latest System Updates</p>
      </div>

      <div className="space-y-5">
        {activities.length === 0 && <div className="flex justify-center items-center h-40 text-slate-500">No Recent Activities</div>}

        {activities.map((activity, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0">{getIcon(activity.type)}</div>

            <div className="flex-1">
              <h4 className="text-white font-medium">{activity.title}</h4>

              <p className="text-sm text-slate-400 mt-1">{activity.description}</p>

              <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
                <Clock className="h-3 w-3" />

                {new Date(activity.createdAt).toLocaleString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivities;

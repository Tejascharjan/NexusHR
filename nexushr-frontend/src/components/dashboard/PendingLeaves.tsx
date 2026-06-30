import { Badge } from "@/components/ui/badge";
import type { RecentLeave } from "@/types/DashboardTypes";

interface PendingLeavesProps {
  leaves: RecentLeave[];
}

const PendingLeaves = ({ leaves }: PendingLeavesProps) => {
  return (
    <div className="bg-card-bg border border-slate-800 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Pending Leaves</h3>

          <p className="text-sm text-slate-400">Awaiting Approval</p>
        </div>
      </div>

      <div className="space-y-4">
        {leaves.length === 0 && <div className="text-center py-8 text-slate-500">No Pending Leave Requests</div>}

        {leaves.map((leave) => (
          <div key={leave.leaveId} className="border border-slate-800 rounded-xl p-4 hover:border-orange-500/40 transition-all">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-white font-medium">{leave.employeeName}</h4>

                <p className="text-sm text-slate-400 mt-1">{leave.leaveType}</p>

                <p className="text-xs text-slate-500 mt-2">
                  {new Date(leave.fromDate).toLocaleDateString("en-IN")} - {new Date(leave.toDate).toLocaleDateString("en-IN")}
                </p>

                <p className="text-xs text-slate-500 mt-1">
                  {leave.totalDays} Day{leave.totalDays > 1 ? "s" : ""}
                </p>
              </div>

              <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">{leave.status}</Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingLeaves;

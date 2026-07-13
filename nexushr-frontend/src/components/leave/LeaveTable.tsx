import { Check, X } from "lucide-react";
import LeaveStatusBadge from "./LeaveStatusBadge";
import type { Leave } from "@/types/LeaveTypes";
import { useState } from "react";
import LeaveApprovalDialog from "./LeaveApprovalDialog";

const LeaveTable = ({ isAdmin, leaves }: { isAdmin: boolean; leaves: Leave[] }) => {
  const [selectedLeaveId, setSelectedLeaveId] = useState<Number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [action, setAction] = useState<"APPROVE" | "REJECT">("APPROVE");

  return (
    <div className="bg-card-bg border border-slate-800 rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#020817] border-b border-slate-800">
            <tr>
              {isAdmin && <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">Employee</th>}

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">Leave Type</th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">Duration</th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">Days</th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">Reason</th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">Applied On</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-slate-400">Status</th>
              {isAdmin && <th className="px-6 py-4 text-right text-sm font-semibold text-slate-400">Actions</th>}
            </tr>
          </thead>

          <tbody>
            {leaves.length === 0 && (
              <tr>
                <td colSpan={isAdmin ? 8 : 7} className="text-center py-12 text-slate-400">
                  No leave requests found.
                </td>
              </tr>
            )}

            {leaves.map((leave) => (
              <tr key={leave.id} className="border-b border-slate-800 hover:bg-slate-800/40 transition-all">
                {isAdmin && (
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-white font-medium">{leave.employeeName}</p>

                      <p className="text-xs text-slate-500">{leave.departmentName}</p>
                    </div>
                  </td>
                )}

                <td className="px-6 py-4 text-white">{leave.leaveType}</td>

                <td className="px-6 py-4 text-slate-300">
                  {leave.fromDate}
                  <br />
                  <span className="text-slate-500">to</span>
                  <br />
                  {leave.toDate}
                </td>

                <td className="px-6 py-4 text-white">{leave.totalDays}</td>

                <td className="px-6 py-4 max-w-xs">
                  <p className="truncate text-slate-300">{leave.reason}</p>
                </td>

                <td className="px-6 py-4 text-slate-300">
                  {new Date(leave.requestedAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>

                <td className="px-6 py-4 text-center">
                  <LeaveStatusBadge status={leave.status} />
                </td>

                {isAdmin && leave.status === "PENDING" && (
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <>
                        <button
                          onClick={() => {
                            setSelectedLeaveId(leave.id);
                            setAction("APPROVE");
                            setDialogOpen(true);
                          }}
                          className="p-2 rounded-lg bg-green-600 hover:bg-green-700 text-white transition">
                          <Check size={18} />
                        </button>

                        <button
                          onClick={() => {
                            setSelectedLeaveId(leave.id);
                            setAction("REJECT");
                            setDialogOpen(true);
                          }}
                          className="p-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition">
                          <X size={18} />
                        </button>
                      </>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {selectedLeaveId && (
          <LeaveApprovalDialog
            open={dialogOpen}
            onClose={() => {
              setDialogOpen(false);
              setSelectedLeaveId(null);
            }}
            action={action}
            leaveId={selectedLeaveId}
          />
        )}
      </div>
    </div>
  );
};

export default LeaveTable;

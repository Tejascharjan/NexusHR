import { LineChart, Line, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";

import type { AttendanceChart as AttendanceChartType } from "@/types/DashboardTypes";

interface AttendanceChartProps {
  data: AttendanceChartType[];
}

const AttendanceChart = ({ data }: AttendanceChartProps) => {
  return (
    <div className="bg-card-bg border border-slate-800 rounded-2xl p-6 h-105">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-lg font-semibold text-white">Attendance Overview</h3>

          <p className="text-sm text-slate-400">Last 7 Days</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data}>
          <CartesianGrid stroke="#334155" strokeDasharray="3 3" />

          <XAxis dataKey="date" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={{ stroke: "#334155" }} tickLine={false} />

          <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={{ stroke: "#334155" }} tickLine={false} />

          <Tooltip
            contentStyle={{
              background: "#0f172a",
              border: "1px solid #334155",
              borderRadius: "12px",
            }}
            labelStyle={{
              color: "#f8fafc",
            }}
          />

          <Legend />

          <Line type="monotone" dataKey="present" stroke="#22c55e" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />

          <Line type="monotone" dataKey="absent" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />

          <Line type="monotone" dataKey="leaveCount" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceChart;

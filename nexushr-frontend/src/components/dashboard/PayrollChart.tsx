import { BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

import type { PayrollChart as PayrollChartType } from "@/types/DashboardTypes";

interface PayrollChartProps {
  data: PayrollChartType[];
}

const PayrollChart = ({ data }: PayrollChartProps) => {
  return (
    <div className="bg-card-bg border border-slate-800 rounded-2xl p-6 h-105">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-lg font-semibold text-white">Monthly Payroll</h3>

          <p className="text-sm text-slate-400">Payroll Expenses</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data}>
          <CartesianGrid stroke="#334155" strokeDasharray="3 3" />

          <XAxis dataKey="month" tick={{ fill: "#94a3b8", fontSize: 12 }} tickLine={false} axisLine={{ stroke: "#334155" }} />

          <YAxis
            tick={{ fill: "#94a3b8", fontSize: 12 }}
            tickFormatter={(value) => `₹${value / 1000}K`}
            tickLine={false}
            axisLine={{ stroke: "#334155" }}
          />

          <Tooltip
            formatter={(value: number) => [`₹${value.toLocaleString()}`, "Payroll"]}
            contentStyle={{
              background: "#0f172a",
              border: "1px solid #334155",
              borderRadius: "12px",
            }}
            labelStyle={{
              color: "#f8fafc",
            }}
          />

          <Bar dataKey="payrollAmount" fill="#f97316" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PayrollChart;

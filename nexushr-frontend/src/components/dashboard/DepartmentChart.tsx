import type { DepartmentChart as DepartmentChartType } from "@/types/DashboardTypes";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface DepartmentChartProps {
  data: DepartmentChartType[];
}

const COLORS = ["#f97316", "#3b82f6", "#22c55e", "#a855f7", "#eab308", "#ef4444", "#06b6d4", "#84cc16"];

const DepartmentChart = ({ data }: DepartmentChartProps) => {
  return (
    <div className="bg-card-bg border border-slate-800 rounded-2xl p-6 h-105">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold text-white">Department Distribution</h3>

        <span className="text-sm text-slate-400">{data.length} Departments</span>
      </div>

      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={data}
            dataKey="employeeCount"
            nameKey="departmentName"
            innerRadius={70}
            outerRadius={110}
            paddingAngle={3}
            label={({ name, percent }) => `${name} ${(percent! * 100).toFixed(0)}%`}>
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip
            formatter={(value: number) => [`${value} Employees`, "Count"]}
            contentStyle={{
              background: "#0f172a",
              border: "1px solid #334155",
              borderRadius: "12px",
            }}
            labelStyle={{
              color: "#f8fafc",
            }}
          />

          <Legend
            verticalAlign="bottom"
            wrapperStyle={{
              color: "#cbd5e1",
              fontSize: "14px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DepartmentChart;

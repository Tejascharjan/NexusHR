interface PayrollStatsProps {
  totalPayroll?: number;
  totalEmployees?: number;
  processedEmployees?: number;
  pendingEmployees?: number;
}

const PayrollStats = ({ totalPayroll = 1250000, totalEmployees = 120, processedEmployees = 118, pendingEmployees = 2 }: PayrollStatsProps) => {
  const stats = [
    {
      title: "Total Payroll",
      value: `₹ ${totalPayroll.toLocaleString()}`,
    },
    {
      title: "Employees",
      value: totalEmployees,
    },
    {
      title: "Processed",
      value: processedEmployees,
    },
    {
      title: "Pending",
      value: pendingEmployees,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="
            bg-card-bg
            border
            border-slate-800
            rounded-2xl
            p-6
          ">
          <p className="text-sm text-slate-400">{stat.title}</p>

          <h3 className="mt-3 text-3xl font-bold text-white">{stat.value}</h3>
        </div>
      ))}
    </div>
  );
};

export default PayrollStats;

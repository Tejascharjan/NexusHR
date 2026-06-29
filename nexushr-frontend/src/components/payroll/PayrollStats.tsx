import { useAppSelector } from "@/state/store";
import { CheckCircle, Clock, CreditCard, IndianRupee, Users, Wallet } from "lucide-react";

const PayrollStats = () => {
  const { stats } = useAppSelector((store) => store.payroll);

  const statistics = [
    {
      title: "Total Employees",
      value: stats?.totalEmployees ?? 0,
      icon: Users,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      title: "Processed",
      value: stats?.processedEmployees ?? 0,
      icon: CheckCircle,
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
    {
      title: "Paid",
      value: stats?.paidEmployees ?? 0,
      icon: CreditCard,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      title: "Pending",
      value: stats?.pendingEmployees ?? 0,
      icon: Clock,
      color: "text-orange-400",
      bg: "bg-orange-500/10",
    },
    {
      title: "Total Payroll",
      value: `₹ ${(stats?.totalPayrollAmount ?? 0).toLocaleString("en-IN")}`,
      icon: Wallet,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
    },
    {
      title: "Paid Amount",
      value: `₹ ${(stats?.totalPaidAmount ?? 0).toLocaleString("en-IN")}`,
      icon: IndianRupee,
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
    {
      title: "Pending Amount",
      value: `₹ ${(stats?.totalPendingAmount ?? 0).toLocaleString("en-IN")}`,
      icon: Clock,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
    },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
      {statistics.map((item) => (
        <div key={item.title} className="bg-card-bg border border-slate-800 rounded-2xl p-5 hover:border-orange-500/30 transition-all">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm">{item.title}</p>

              <h2 className="text-2xl font-bold text-white mt-2">{item.value}</h2>
            </div>

            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.bg}`}>
              <item.icon className={`w-6 h-6 ${item.color}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PayrollStats;

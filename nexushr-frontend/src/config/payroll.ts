import { DollarSign, Wallet, CreditCard, TrendingUp } from "lucide-react";

export const PAYROLL_STATS_CONFIG = [
  {
    key: "totalPayroll",
    title: "Total Payroll",
    icon: DollarSign,
  },
  {
    key: "averageSalary",
    title: "Average Salary",
    icon: TrendingUp,
  },
  {
    key: "pendingPayrolls",
    title: "Pending Payrolls",
    icon: CreditCard,
  },
  {
    key: "paidPayrolls",
    title: "Paid Payrolls",
    icon: Wallet,
  },
];

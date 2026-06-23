interface PayrollSummaryCardProps {
  payroll: {
    month: string;
    year: number;
    netSalary: number;
    status: string;
    paidDate?: string;
  };
}

const PayrollSummaryCard = ({ payroll }: PayrollSummaryCardProps) => {
  const getStatusColor = () => {
    switch (payroll.status) {
      case "PAID":
        return "text-green-400";

      case "PROCESSED":
        return "text-orange-400";

      case "FAILED":
        return "text-red-400";

      default:
        return "text-yellow-400";
    }
  };

  return (
    <div
      className="
        bg-orange-500/10
        border
        border-orange-500/20
        rounded-2xl
        p-6
      ">
      <div className="grid md:grid-cols-4 gap-6">
        <div>
          <p className="text-slate-400 text-sm">Net Salary</p>

          <h2 className="text-3xl font-bold text-white mt-2">₹ {payroll.netSalary.toLocaleString()}</h2>
        </div>

        <div>
          <p className="text-slate-400 text-sm">Status</p>

          <p className={`font-semibold mt-2 ${getStatusColor()}`}>{payroll.status}</p>
        </div>

        <div>
          <p className="text-slate-400 text-sm">Paid Date</p>

          <p className="text-white mt-2">{payroll.paidDate || "-"}</p>
        </div>

        <div>
          <p className="text-slate-400 text-sm">Payroll Period</p>

          <p className="text-white mt-2">
            {payroll.month} {payroll.year}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PayrollSummaryCard;

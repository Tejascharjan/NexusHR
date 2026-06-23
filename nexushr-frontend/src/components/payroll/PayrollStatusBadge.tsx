interface PayrollStatusBadgeProps {
  status: string;
}

const PayrollStatusBadge = ({ status }: PayrollStatusBadgeProps) => {
  const getStatusStyles = () => {
    switch (status) {
      case "PAID":
        return "bg-green-500/20 text-green-400 border-green-500/20";

      case "PROCESSED":
        return "bg-orange-500/20 text-orange-400 border-orange-500/20";

      case "PENDING":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/20";

      case "FAILED":
        return "bg-red-500/20 text-red-400 border-red-500/20";

      default:
        return "bg-slate-700 text-slate-300 border-slate-600";
    }
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        px-3
        py-1
        rounded-full
        text-xs
        font-medium
        border
        ${getStatusStyles()}
      `}>
      {status}
    </span>
  );
};

export default PayrollStatusBadge;

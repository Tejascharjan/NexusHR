interface Props {
  status: string;
}

const LeaveStatusBadge = ({ status }: Props) => {
  const styles = {
    PENDING: "bg-yellow-500/20 text-yellow-400",

    APPROVED: "bg-green-500/20 text-green-400",

    REJECTED: "bg-red-500/20 text-red-400",

    CANCELLED: "bg-slate-500/20 text-slate-300",
  };

  return <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status as keyof typeof styles]}`}>{status}</span>;
};

export default LeaveStatusBadge;

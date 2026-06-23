const activities = [
  "New employee joined HR Department",
  "Payroll generated successfully",
  "Attendance updated",
  "Leave request approved",
];

const RecentActivities = () => {
  return (
    <div
      className="
      bg-[#0f172a]
      border
      border-slate-800
      rounded-2xl
      p-6
      "
    >
      <h3 className="text-lg font-semibold mb-5">Recent Activities</h3>

      <div className="space-y-4">
        {activities.map((item, index) => (
          <div
            key={index}
            className="
            flex
            gap-3
            items-start
            "
          >
            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2" />

            <p className="text-sm text-slate-300">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivities;

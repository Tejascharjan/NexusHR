import type { MonthlyAttendance } from "@/state/monthlyAttendanceSlice";

interface Props {
  attendance: MonthlyAttendance[];
}

const MonthlyAttendanceTable = ({ attendance }: Props) => {
  return (
    <div className="bg-card-bg border border-slate-800 rounded-2xl overflow-hidden ">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-800">
            <th className="px-6 py-4 text-left text-slate-400">Employee</th>

            <th className="px-6 py-4 text-left text-slate-400">Department</th>

            <th className="px-6 py-4 text-center text-slate-400">Present</th>

            <th className="px-6 py-4 text-center text-slate-400">Absent</th>

            <th className="px-6 py-4 text-center text-slate-400">Leave</th>

            <th className="px-6 py-4 text-center text-slate-400">Working Days</th>

            <th className="px-6 py-4 text-center text-slate-400">Attendance %</th>
          </tr>
        </thead>

        <tbody>
          {attendance.map((item) => (
            <tr
              key={item.employeeId}
              className="
                border-b
                border-slate-800
                hover:bg-slate-800/40
              ">
              <td className="px-6 py-4 text-white">{item.employeeName}</td>

              <td className="px-6 py-4 text-slate-300">{item.departmentName}</td>

              <td className="px-6 py-4 text-center text-green-400">{item.presentDays}</td>

              <td className="px-6 py-4 text-center text-red-400">{item.absentDays}</td>

              <td className="px-6 py-4 text-center text-yellow-400">{item.leaveDays}</td>

              <td className="px-6 py-4 text-center text-white">{item.totalWorkingDays}</td>

              <td className="px-6 py-4 text-center text-orange-400 font-medium">{item.attendancePercentage.toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MonthlyAttendanceTable;

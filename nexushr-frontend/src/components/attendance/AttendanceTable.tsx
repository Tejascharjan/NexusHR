import { useAppSelector } from "@/state/store";

const AttendanceTable = ({ isAdmin }: { isAdmin: boolean }) => {
  const { attendances } = useAppSelector((store) => store.attendance);

  return (
    <div className="bg-card-bg border border-slate-800 rounded-2xl overflow-hidden">
      <div className="p-6 border-b border-slate-800">
        <h2 className="text-lg text-white font-semibold">Attendance Records</h2>
      </div>

      <table className="w-full">
        <thead>
          <tr className="bg-slate-900">
            {isAdmin && <th className="p-4 text-left text-slate-400">Employee</th>}

            {isAdmin && <th className="p-4 text-left text-slate-400">Department</th>}

            <th className="p-4 text-center text-slate-400">Date</th>

            <th className="p-4 text-center text-slate-400">Check In</th>

            <th className="p-4 text-center text-slate-400">Check Out</th>

            <th className="p-4 text-right text-slate-400">Hours</th>

            <th className="p-4 text-center text-slate-400">Status</th>

            <th className="p-4 text-center text-slate-400">Verification</th>
          </tr>
        </thead>

        <tbody>
          {attendances.map((attendance) => (
            <tr key={attendance.id} className="border-t border-slate-800">
              {isAdmin && (
                <td className="p-4 text-white">
                  {attendance?.employee?.firstName} {attendance?.employee?.lastName}
                </td>
              )}

              {isAdmin && <td className="p-4 text-slate-300">{attendance?.employee?.departmentName}</td>}

              <td className="p-4 text-center text-slate-300">{attendance.date}</td>

              <td className="p-4 text-center text-slate-300">{attendance.checkIn}</td>

              <td className="p-4 text-center text-slate-300">{attendance.checkOut}</td>

              <td className="p-4 text-right text-slate-300">{attendance.workedHours?.toFixed(2)}</td>

              <td className="p-4 text-center text-slate-300">{attendance.status}</td>

              <td className="p-4 text-center">
                <span className="px-3 py-1 rounded-full text-xs bg-green-500/10 text-green-400">
                  {attendance.biometricVerified ? "Verified" : "Not Verfied"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable;

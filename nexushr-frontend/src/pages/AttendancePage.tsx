import AttendanceStatsCards from "@/components/attendance/AttendanceStatsCards";
import AttendanceFilters from "@/components/attendance/AttendanceFilters";
import AttendanceTable from "@/components/attendance/AttendanceTable";
import MarkAttendanceForm from "@/components/attendance/MarkAttendanceForm";
import { useAppSelector } from "@/state/store";

const AttendancePage = () => {
  const { user } = useAppSelector((store) => store.auth);
  const isAdmin = user?.role === "ADMIN" || user?.role === "EMPLOYEE";

  return (
    <div className="space-y-6">
      <AttendanceStatsCards isAdmin={isAdmin} />

      {isAdmin && <MarkAttendanceForm />}

      <AttendanceFilters isAdmin={isAdmin} />

      <AttendanceTable isAdmin={isAdmin} />
    </div>
  );
};

export default AttendancePage;

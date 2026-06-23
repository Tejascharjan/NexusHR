import AttendanceStatsCards from "@/components/attendance/AttendanceStatsCards";
import AttendanceFilters from "@/components/attendance/AttendanceFilters";
import AttendanceTable from "@/components/attendance/AttendanceTable";
import MarkAttendanceForm from "@/components/attendance/MarkAttendanceForm";

const AttendancePage = () => {
  return (
    <div className="space-y-6">
      <AttendanceStatsCards />

      <MarkAttendanceForm />

      <AttendanceFilters />

      <AttendanceTable />
    </div>
  );
};

export default AttendancePage;

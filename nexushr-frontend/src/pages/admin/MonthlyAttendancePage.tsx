import MonthlyAttendanceFilter from "@/components/attendance/MonthlyAttendanceFilter";
import MonthlyAttendanceTable from "@/components/attendance/MonthlyAttendanceTable";

const MonthlyAttendancePage = () => {
     return (
          <div className="space-y-6">
               <div>
                    <h1 className="text-3xl font-bold text-text-primary">Monthly Attendance</h1>
                    <p className="text-text-secondary mt-1">View employee attendance summary by month</p>
               </div>

               <MonthlyAttendanceFilter />

               <MonthlyAttendanceTable />
          </div>
     );
};

export default MonthlyAttendancePage;
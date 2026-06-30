import type { RecentEmployee } from "@/types/DashboardTypes";
import { Badge } from "@/components/ui/badge";

interface RecentEmployeesProps {
  employees: RecentEmployee[];
}

const RecentEmployees = ({ employees }: RecentEmployeesProps) => {
  return (
    <div className="bg-card-bg border border-slate-800 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Recent Employees</h3>

          <p className="text-sm text-slate-400">Recently Joined Employees</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="text-left py-3 text-slate-400 font-medium">Employee</th>

              <th className="text-left py-3 text-slate-400 font-medium">Department</th>

              <th className="text-left py-3 text-slate-400 font-medium">Designation</th>

              <th className="text-left py-3 text-slate-400 font-medium">Joined</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((employee) => (
              <tr key={employee.employeeId} className="border-b border-slate-900 hover:bg-slate-900/40 transition-colors">
                <td className="py-4">
                  <div className="font-medium text-white">{employee.employeeName}</div>
                </td>

                <td className="py-4">
                  <Badge variant="outline" className="border-slate-700 text-slate-300">
                    {employee.department}
                  </Badge>
                </td>

                <td className="py-4 text-slate-300">{employee.designation}</td>

                <td className="py-4 text-slate-400">
                  {new Date(employee.joiningDate).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
              </tr>
            ))}

            {employees.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-8 text-slate-500">
                  No Employees Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentEmployees;

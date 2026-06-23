import { getAllEmployees } from "@/state/employeeSlice";
import { useAppDispatch, useAppSelector } from "@/state/store";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect } from "react";

const EmployeeTable = () => {
  const dispatch = useAppDispatch();
  const { employee } = useAppSelector((store) => store);

  useEffect(() => {
    dispatch(getAllEmployees());
  }, [dispatch]);

  return (
    <div className="bg-card-bg border border-slate-800 rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-800">
        <h2 className="font-semibold">Employees</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#020817] text-slate-400">
              <th className="p-4 text-left">Employee</th>

              <th className="p-4 text-left">Email</th>

              <th className="p-4 text-left">Department</th>

              <th className="p-4 text-left">Role</th>

              <th className="p-4 text-left">Status</th>

              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {employee.employees.map((employee) => (
              <tr
                key={employee.id}
                className="border-t border-slate-800 hover:bg-slate-800/20">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400 font-semibold">
                      {employee.firstName[0]}
                    </div>

                    <div>
                      <p className="font-medium">
                        {employee.firstName} {employee.lastName}
                      </p>

                      <p className="text-xs text-slate-500">
                        EMP00{employee.id}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="p-4">{employee.email}</td>

                <td className="p-4">{employee.departmentName}</td>

                <td className="p-4">{employee.role}</td>

                <td className="p-4">
                  <span className="px-3 py-1 rounded-full text-xs bg-green-500/10 text-green-400">
                    {employee.status}
                  </span>
                </td>

                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    <button className="p-2 rounded-lg hover:bg-slate-700/30">
                      <Pencil size={16} />
                    </button>

                    <button className="p-2 rounded-lg hover:bg-red-500/10 text-red-400">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}

      <div
        className="
        flex
        justify-between
        items-center
        p-4
        border-t
        border-slate-800
        ">
        <span className="text-sm text-slate-500">Showing 1-10 of 100</span>

        <div className="flex gap-2">
          <button
            className="
            px-3 py-2
            rounded-lg
            border border-slate-700
            ">
            Previous
          </button>

          <button
            className="
            px-3 py-2
            rounded-lg
            bg-orange-500
            ">
            1
          </button>

          <button
            className="
            px-3 py-2
            rounded-lg
            border border-slate-700
            ">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTable;

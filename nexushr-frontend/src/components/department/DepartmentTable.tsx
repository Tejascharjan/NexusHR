import { useAppDispatch, useAppSelector } from "@/state/store";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { getAllDepartments, type Department } from "@/state/departmentSlice.ts";

const DepartmentTable = ({ onEdit }: { onEdit: (department: Department) => void }) => {
  const dispatch = useAppDispatch();
  const { department } = useAppSelector((store) => store);

  useEffect(() => {
    dispatch(getAllDepartments());
  }, [dispatch]);

  return (
    <div className="bg-card-bg border border-slate-800 rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-800">
        <h2 className="font-semibold">Departments</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#020817] text-slate-400">
              <th className="p-4 text-left">Department</th>
              <th className="p-4 text-left">Manager</th>
              <th className="p-4 text-left">Description</th>

              <th className="p-4 text-left">Status</th>

              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {department.departments.map((department) => (
              <tr
                key={department.id}
                className="border-t border-slate-800 hover:bg-slate-800/20">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400 font-semibold">
                      {department.name[0]}
                    </div>

                    <div>
                      <p className="font-medium">{department.name}</p>

                      <p className="text-xs text-slate-500">
                        DEPT00{department.id}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-4">{department.managerName}</td>
                <td className="p-4">{department.description}</td>

                <td className="p-4">
                  <span className="px-3 py-1 rounded-full text-xs bg-green-500/10 text-green-400">
                    {department.isActive ? "Active" : "Inactive"}
                  </span>
                </td>

                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    <button onClick={() => onEdit(department)} className="p-2 rounded-lg hover:bg-slate-700/30">
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

export default DepartmentTable;

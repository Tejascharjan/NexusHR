import DepartmentDrawer from "@/components/department/DepartmentDrawer";
import DepartmentTable from "@/components/department/DepartmentTable";
import { useAppSelector } from "@/state/store";
import type { Department } from "@/types/DepartmentTypes";
import { useState } from "react";

const DepartmentPage = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const { user } = useAppSelector((store) => store.auth);

  const isAdmin = user?.role === "ADMIN";
  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Department Management</h1>

          <p className="text-slate-400 text-sm">Manage departments and their details</p>
        </div>

        {isAdmin && (
          <button
            onClick={() => {
              setSelectedDepartment(null);
              setOpenDrawer(true);
            }}
            className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 rounded-xl font-medium">
            Add Department
          </button>
        )}
      </div>

      <DepartmentTable
        onEdit={(department) => {
          setSelectedDepartment(department);
          setOpenDrawer(true);
        }}
      />

      <DepartmentDrawer
        open={openDrawer}
        selectedDepartment={selectedDepartment}
        onClose={() => {
          setOpenDrawer(false);
          setSelectedDepartment(null);
        }}
      />
    </div>
  );
};

export default DepartmentPage;

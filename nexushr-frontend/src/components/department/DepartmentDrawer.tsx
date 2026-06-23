import type { Department } from "@/state/departmentSlice";
import DepartmentForm from "./DepartmentForm";

interface Props {
  open: boolean;
  onClose: () => void;
  selectedDepartment?: Department | null;
}

const DepartmentDrawer = ({ open, onClose, selectedDepartment }: Props) => {
  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-40" onClick={onClose} />

      <div className="fixed right-0 top-0 h-screen w-full md:w-150 bg-[#020817] border-l border-slate-800 z-50 overflow-y-auto">
        <div className="p-5 border-b border-slate-800 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Add Department</h2>

          <button onClick={onClose} className="text-slate-400 hover:text-red-400">
            ✕
          </button>
        </div>

        <div className="p-6">
          <DepartmentForm selectedDepartment={selectedDepartment}
            onSuccess={onClose} />
        </div>
      </div>
    </>
  );
};

export default DepartmentDrawer;

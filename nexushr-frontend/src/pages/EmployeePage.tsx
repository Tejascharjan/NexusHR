import EmployeeTable from "@/components/employee/EmployeeTable";
import { useNavigate } from "react-router-dom";

const EmployeePage = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Employee Management</h1>
          <p className="text-slate-400 text-sm">Manage employees and their details</p>
        </div>

        <button onClick={() => navigate("/admin/add-employee")} className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 rounded-xl font-medium ">
          Add Employee
        </button>
      </div>

      <EmployeeTable />
    </div>
  );
};

export default EmployeePage;

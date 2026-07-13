import PayrollFilters from "@/components/payroll/PayrollFilters";
import PayrollGenerationModal from "@/components/payroll/PayrollGenerationModal";
import PayrollStats from "@/components/payroll/PayrollStats";
import PayrollTable from "@/components/payroll/PayrollTable";
import { filterPayroll, getEmployeePayrolls } from "@/state/payrollSlice";
import { useAppDispatch, useAppSelector } from "@/state/store";
import { useEffect, useState } from "react";

const PayrollPage = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((store) => store.auth);

  const today = new Date();
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const isAdmin = user?.role === "ADMIN" || user?.role === "MANAGER";

  const [filters, setFilters] = useState({
    payrollMonth: today.getMonth() + 1,
    payrollYear: today.getFullYear(),
    departmentId: undefined as number | undefined,
    status: undefined as string | undefined,
    page: 0,
    size: 10,
  });

  useEffect(() => {
    if (isAdmin) {
      dispatch(filterPayroll(filters));
    } else {
      dispatch(getEmployeePayrolls({ employeeId: user.id, ...filters }));
    }
  }, [dispatch, filters, user, isAdmin]);

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Payroll Management</h1>

          <p className="text-slate-400 mt-1">Manage employee payrolls and salary processing</p>
        </div>

        {isAdmin && (
          <button
            onClick={() => setShowGenerateModal(true)}
            className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white  transition-all">
            Generate Payroll
          </button>
        )}
      </div>

      {isAdmin && <PayrollStats />}
      {isAdmin && <PayrollFilters filters={filters} setFilters={setFilters} />}

      <PayrollTable filters={filters} setFilters={setFilters} isAdmin={isAdmin} />

      {showGenerateModal && <PayrollGenerationModal onClose={() => setShowGenerateModal(false)} />}
    </div>
  );
};

export default PayrollPage;

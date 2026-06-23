import PayrollFilters from "@/components/payroll/PayrollFilters";
import PayrollGenerationModal from "@/components/payroll/PayrollGenerationModal";
import PayrollStats from "@/components/payroll/PayrollStats";
import PayrollTable from "@/components/payroll/PayrollTable";
import { useState } from "react";

const PayrollPage = () => {
  const [showGenerateModal, setShowGenerateModal] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Payroll Management</h1>

          <p className="text-slate-400 mt-1">Manage employee payrolls and salary processing</p>
        </div>

        <button
          onClick={() => setShowGenerateModal(true)}
          className="
            px-5
            py-2.5
            rounded-xl
            bg-orange-500
            hover:bg-orange-600
            text-white
            transition-all
          ">
          Generate Payroll
        </button>
      </div>

      {/* Stats */}

      <PayrollStats />

      {/* Filters */}

      <PayrollFilters />

      {/* Table */}

      <PayrollTable />

      {/* Modal */}

      {showGenerateModal && <PayrollGenerationModal onClose={() => setShowGenerateModal(false)} />}
    </div>
  );
};

export default PayrollPage;

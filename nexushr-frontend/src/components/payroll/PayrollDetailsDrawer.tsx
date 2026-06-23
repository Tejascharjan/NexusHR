import { X } from "lucide-react";
import PayrollSummaryCard from "./PayrollSummaryCard";
import PayrollItemsTable from "./PayrollItemsTable";

interface PayrollDetailsDrawerProps {
  open: boolean;
  onClose: () => void;
}

const PayrollDetailsDrawer = ({ open, onClose }: PayrollDetailsDrawerProps) => {
  if (!open) return null;

  const payroll = {
    employeeName: "John Doe",
    employeeId: "EMP001",
    department: "Engineering",
    designation: "Software Engineer",

    month: "June",
    year: 2026,

    basicSalary: 50000,
    grossSalary: 60000,
    totalAllowances: 12000,
    totalDeductions: 2500,
    netSalary: 57500,

    status: "PAID",
    paidDate: "15-Jun-2026",
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40">
      <div
        className="
          h-full
          w-full
          max-w-3xl
          bg-card-bg
          border-l
          border-slate-800
          overflow-y-auto
        ">
        {/* Header */}

        <div
          className="
            sticky
            top-0
            bg-card-bg
            border-b
            border-slate-800
            px-6
            py-4
            flex
            items-center
            justify-between
            z-10
          ">
          <div>
            <h2 className="text-xl font-semibold text-white">Payroll Details</h2>

            <p className="text-slate-400 text-sm">
              {payroll.month} {payroll.year}
            </p>
          </div>

          <button
            onClick={onClose}
            className="
              p-2
              rounded-lg
              hover:bg-slate-800
              text-slate-400
            ">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Employee Information */}

          <div
            className="
              bg-[#020817]
              border
              border-slate-800
              rounded-2xl
              p-5
            ">
            <h3 className="text-lg font-semibold text-white mb-4">Employee Information</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-slate-400 text-sm">Employee Name</p>

                <p className="text-white">{payroll.employeeName}</p>
              </div>

              <div>
                <p className="text-slate-400 text-sm">Employee ID</p>

                <p className="text-white">{payroll.employeeId}</p>
              </div>

              <div>
                <p className="text-slate-400 text-sm">Department</p>

                <p className="text-white">{payroll.department}</p>
              </div>

              <div>
                <p className="text-slate-400 text-sm">Designation</p>

                <p className="text-white">{payroll.designation}</p>
              </div>
            </div>
          </div>

          {/* Summary */}

          <PayrollSummaryCard payroll={payroll} />

          {/* Salary Snapshot */}

          <div
            className="
              bg-[#020817]
              border
              border-slate-800
              rounded-2xl
              p-5
            ">
            <h3 className="text-lg font-semibold text-white mb-4">Salary Snapshot</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-slate-400 text-sm">Basic Salary</p>

                <p className="text-white">₹ {payroll.basicSalary.toLocaleString()}</p>
              </div>

              <div>
                <p className="text-slate-400 text-sm">Gross Salary</p>

                <p className="text-white">₹ {payroll.grossSalary.toLocaleString()}</p>
              </div>

              <div>
                <p className="text-slate-400 text-sm">Total Allowances</p>

                <p className="text-green-400">₹ {payroll.totalAllowances.toLocaleString()}</p>
              </div>

              <div>
                <p className="text-slate-400 text-sm">Total Deductions</p>

                <p className="text-red-400">₹ {payroll.totalDeductions.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Payroll Items */}

          <PayrollItemsTable items={[]} />
        </div>
      </div>
    </div>
  );
};

export default PayrollDetailsDrawer;

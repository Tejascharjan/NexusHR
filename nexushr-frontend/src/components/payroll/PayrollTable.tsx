import { useAppDispatch, useAppSelector } from "@/state/store";
import PayrollStatusBadge from "./PayrollStatusBadge";
import React from "react";
import { downloadFile } from "@/utils/fileDownload";
import { ChevronLeft, ChevronRight, Download, FileText } from "lucide-react";
import { downloadRtgs, downloadSalarySlip, filterPayroll, markPayrollPaid } from "@/state/payrollSlice";
import { toast } from "react-toastify";

interface Props {
  filters: any;
  setFilters: React.Dispatch<React.SetStateAction<any>>;
}

const PayrollTable = ({ filters, setFilters }: Props) => {
  const dispatch = useAppDispatch();
  const { payrolls, totalPages, page, loading } = useAppSelector((store) => store.payroll);

  const handleSalarySlip = async (payrollId: number) => {
    try {
      const blob = (await dispatch(downloadSalarySlip(payrollId)).unwrap()) as Blob;
      downloadFile(blob, `salary-slip-${payrollId}.pdf`);
    } catch (error: any) {
      console.log("Failed to download salary slip");
    }
  };

  const handleRtgsDownload = async () => {
    if (!filters.payrollMonth || !filters.payrollYear) {
      toast.error("Please select payroll month and year.");
      return;
    }

    try {
      const blob = await dispatch(downloadRtgs({ month: filters.payrollMonth, year: filters.payrollYear })).unwrap();
      downloadFile(blob, `RTGS-${filters.payrollMonth}-${filters.payrollYear}.xlsx`);
    } catch (error: any) {
      console.log("Failed to download rtgs", error);
    }
  };

  const handleMarkPaid = async (payrollId: number) => {
    try {
      await dispatch(markPayrollPaid(payrollId)).unwrap();
      dispatch(filterPayroll(filters));
    } catch (error: any) {
      toast.error("Unable to update payroll");
    }
  };

  return (
    <div className="bg-card-bg border border-slate-800 rounded-2xl overflow-hiddens">
      <div className="p-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Payroll Records</h2>
        <button onClick={handleRtgsDownload} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white">
          <Download size={18} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">Employee</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">Month</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">Basic Salary</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">Allowances</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">Gross Salary</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">Deductions</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">Net Salary</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">Status</th>
              <th className="px-6 py-4 text-right text-sm font-medium text-slate-400">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={9} className="text-center py-10 text-slate-400">
                  Loading...
                </td>
              </tr>
            ) : payrolls.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-10 text-slate-400">
                  No payroll records found.
                </td>
              </tr>
            ) : (
              payrolls.map((payroll) => (
                <tr key={payroll.payrollId} className="border-b border-slate-800 hover:bg-slate-800/30">
                  <td className="px-6 py-4 text-white">{payroll.employeeName}</td>

                  <td className="px-6 py-4">
                    {new Date(payroll.payrollYear, payroll.payrollMonth - 1).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
                  </td>

                  <td className="px-6 py-4">₹ {payroll.basicSalary.toLocaleString()}</td>

                  <td className="px-6 py-4">₹ {payroll.totalAllowances.toLocaleString()}</td>

                  <td className="px-6 py-4">₹ {payroll.grossSalary.toLocaleString()}</td>

                  <td className="px-6 py-4">₹ {payroll.totalDeductions.toLocaleString()}</td>

                  <td className="px-6 py-4 font-semibold text-white">₹ {payroll.netSalary.toLocaleString()}</td>

                  <td className="px-6 py-4 text-center">
                    <PayrollStatusBadge status={payroll.status} />
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => handleSalarySlip(payroll.payrollId)} className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600">
                        <FileText size={18} />
                      </button>

                      {payroll.status !== "PAID" && (
                        <button
                          onClick={() => handleMarkPaid(payroll.payrollId)}
                          className="px-3 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white">
                          Mark Paid
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-end gap-2 p-5 border-t border-slate-800">
        <button
          disabled={page === 1}
          onClick={() =>
            setFilters((prev: any) => ({
              ...prev,
              page: prev.page - 1,
            }))
          }
          className="p-2 rounded-lg bg-slate-700 disabled:opacity-40">
          <ChevronLeft size={18} />
        </button>

        <span className="text-slate-300">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page >= totalPages}
          onClick={() =>
            setFilters((prev: any) => ({
              ...prev,
              page: prev.page + 1,
            }))
          }
          className="p-2 rounded-lg bg-slate-700 disabled:opacity-40">
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default PayrollTable;

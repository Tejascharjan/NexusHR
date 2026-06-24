import { useAppDispatch, useAppSelector } from "@/state/store";
import PayrollStatusBadge from "./PayrollStatusBadge";
import { downloadRtgs, downloadSalarySlip, getPayrolls } from "@/state/payrollSlice";
import { useEffect } from "react";
import { downloadFile } from "@/utils/fileDownload";
import { Download, FileText } from "lucide-react";

const PayrollTable = () => {
  const dispatch = useAppDispatch();
  const { payrolls } = useAppSelector((store) => store.payroll);

  useEffect(() => {
    dispatch(getPayrolls());
  }, [dispatch]);

  const handleSalarySlip = async (payrollId: number) => {
    try {
      const blob = (await dispatch(downloadSalarySlip(payrollId)).unwrap()) as Blob;
      downloadFile(blob, `salary-slip-${payrollId}.pdf`);
    } catch (error: any) {
      console.log("Failed to download salary slip");
    }
  };

  const handleRtgsDownload = async () => {
    try {
      const blob = (await dispatch(downloadRtgs({ month: 6, year: 2026 })).unwrap()) as Blob;
      downloadFile(blob, `RTGS-6-2026.xlsx`);
    } catch (error: any) {
      console.log("Failed to download rtgs");
    }
  };

  return (
    <div className="bg-card-bg border border-slate-800 rounded-2xl overflow-hiddens">
      <div className="p-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Payroll Table</h2>
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
            {payrolls.map((payroll) => (
              <tr key={payroll.payrollId} className="border-b border-slate-800 hover:bg-slate-800/40 transition-all">
                <td className="px-6 py-4 text-white">{payroll.employeeName}</td>
                <td className="px-6 py-4 text-slate-300">
                  {payroll.payrollMonth} / {payroll.payrollYear}
                </td>

                <td className="px-6 py-4 text-slate-300">₹ {payroll.basicSalary.toLocaleString()}</td>

                <td className="px-6 py-4 text-slate-300">₹ {payroll.totalAllowances.toLocaleString()}</td>

                <td className="px-6 py-4 text-slate-300">₹ {payroll.grossSalary.toLocaleString()}</td>

                <td className="px-6 py-4 text-slate-300">₹ {payroll.totalDeductions.toLocaleString()}</td>

                <td className="px-6 py-4 font-medium text-white">₹ {payroll.netSalary.toLocaleString()}</td>

                <td className="px-6 py-4 text-center">
                  <PayrollStatusBadge status={payroll.status} />
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => handleSalarySlip(payroll.payrollId)} className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600">
                      <FileText size={18} />
                    </button>
                    {payroll.status !== "PAID" && (
                      <button className="px-3 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white transition-all">Mark Paid</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PayrollTable;

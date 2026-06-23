import { generatePayroll } from "@/state/payrollSlice";
import { useAppDispatch } from "@/state/store";
import { useState } from "react";
import { toast } from "react-toastify";

interface PayrollGenerationModalProps {
  onClose: () => void;
}

const PayrollGenerationModal = ({ onClose }: PayrollGenerationModalProps) => {
  const dispatch = useAppDispatch();
  const currentYear = new Date().getFullYear();

  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const [year, setYear] = useState(currentYear);

  const handleGenerate = async () => {
    await dispatch(generatePayroll({ payrollMonth: month, payrollYear: year })).unwrap();
    toast.success("Payroll generated successfully");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 ">
      <div className="w-full max-w-md bg-card-bg border border-slate-800 rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Generate Payroll</h2>
        <div className="space-y-4">
          {/* Month */}
          <div>
            <label className="block text-sm text-slate-300 mb-2">Payroll Month</label>

            <select
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className="w-full bg-[#020817] border border-slate-700 rounded-xl px-4 py-2.5 text-white">
              <option value={1}>January</option>
              <option value={2}>February</option>
              <option value={3}>March</option>
              <option value={4}>April</option>
              <option value={5}>May</option>
              <option value={6}>June</option>
              <option value={7}>July</option>
              <option value={8}>August</option>
              <option value={9}>September</option>
              <option value={10}>October</option>
              <option value={11}>November</option>
              <option value={12}>December</option>
            </select>
          </div>

          {/* Year */}

          <div>
            <label className="block text-sm text-slate-300 mb-2">Payroll Year</label>
            <select
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="w-full bg-[#020817] border border-slate-700 rounded-xl px-4 py-2.5 text-white">
              {Array.from({ length: 5 }).map((_, index) => {
                const value = currentYear - index;

                return (
                  <option key={value} value={value}>
                    {value}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {/* Actions */}

        <div className="flex justify-end gap-3 mt-8">
          <button onClick={onClose} className="px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white">
            Cancel
          </button>

          <button onClick={handleGenerate} className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white">
            Generate
          </button>
        </div>
      </div>
    </div>
  );
};

export default PayrollGenerationModal;

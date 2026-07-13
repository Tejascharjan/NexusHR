import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import { useAppDispatch } from "@/state/store";

import InputField from "@/components/common/InputField";
import SelectField from "@/components/common/SelectField";
import { leaveSchema, type LeaveFormData } from "@/validations/leaveSchema";
import TextAreaField from "../common/TextAreaField";
import type { Employee } from "@/types/EmployeeTypes";
import { applyLeave } from "@/state/leaveSlice";

const ApplyLeaveForm = ({ employees }: { employees: Employee[] }) => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeaveFormData>({
    resolver: zodResolver(leaveSchema),
    defaultValues: {
      employeeId: 0,
      leaveType: undefined,
      fromDate: "",
      toDate: "",
      reason: "",
    },
  });

  const onSubmit = async (data: LeaveFormData) => {
       try {
         
      await dispatch(applyLeave(data)).unwrap();
      toast.success("Leave applied successfully.");

      reset();
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-card-bg border border-slate-800 rounded-xl p-6">
      <div>
        <h2 className="text-xl font-semibold text-white">Apply Leave</h2>

        <p className="text-sm text-slate-400">Submit a leave request for an employee.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <SelectField label="Employee" error={errors.employeeId?.message} {...register("employeeId", { valueAsNumber: true })}>
          <option value={0}>Select Employee</option>

          {employees.map((employee) => (
            <option key={employee.id} value={employee.id}>
              {employee.firstName} {employee.lastName}
            </option>
          ))}
        </SelectField>

        <SelectField label="Leave Type" error={errors.leaveType?.message} {...register("leaveType")}>
          <option value="">Select Leave Type</option>

          <option value="SICK">Sick Leave</option>

          <option value="CASUAL">Casual Leave</option>

          <option value="ANNUAL">Annual Leave</option>

          <option value="MATERNITY">Maternity Leave</option>

          <option value="PATERNITY">Paternity Leave</option>

          <option value="UNPAID">Unpaid Leave</option>
        </SelectField>

        <InputField label="From Date" type="date" error={errors.fromDate?.message} {...register("fromDate")} />

        <InputField label="To Date" type="date" error={errors.toDate?.message} {...register("toDate")} />
      </div>

      <TextAreaField label="Reason" rows={5} placeholder="Enter reason for leave..." error={errors.reason?.message} {...register("reason")} />

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-medium transition-colors">
          {isSubmitting ? "Applying..." : "Apply Leave"}
        </button>
      </div>
    </form>
  );
};

export default ApplyLeaveForm;

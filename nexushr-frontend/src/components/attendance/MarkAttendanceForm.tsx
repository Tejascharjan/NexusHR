import { ATTENDANCE_STATUS } from "@/config/attendance";
import { getAllEmployees } from "@/state/employeeSlice";
import { useAppDispatch, useAppSelector } from "@/state/store";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { createAttendance } from "@/state/attendanceSlice";
import SelectField from "../common/SelectField";
import InputField from "../common/InputField";
import { attendanceSchema, type AttendanceFormData } from "@/validations/attendanceSchema";

const MarkAttendanceForm = () => {
  const dispatch = useAppDispatch();
  const { employees } = useAppSelector((store) => store.employee);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AttendanceFormData>({ resolver: zodResolver(attendanceSchema) });

  const onSubmit = async (data: AttendanceFormData) => {
    try {
      await dispatch(createAttendance(data)).unwrap();
      toast.success("Attendance marked successfully");
      reset();
    } catch (error: any) {
      toast.error(error);
    }
  };

  useEffect(() => {
    dispatch(getAllEmployees());
  }, [dispatch]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-card-bg border border-border-primary rounded-2xl p-6 space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-text-primary">Mark Attendance</h2>

        <p className="text-text-secondary text-sm">Record employee attendance</p>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <SelectField label="Employee" {...register("employeeId", { valueAsNumber: true })} error={errors.employeeId?.message}>
          <option value="">Select Employee</option>
          {employees.map((employee) => (
            <option value={employee.id}>
              {employee.firstName} {employee.lastName}
            </option>
          ))}
        </SelectField>

        <InputField type="date" label="dd-mm-yyyy" {...register("date")} error={errors.date?.message} />

        <InputField type="time" label="Check In" {...register("checkIn")} error={errors.checkIn?.message} />

        <InputField type="time" label="Check Out" {...register("checkOut")} error={errors.checkOut?.message} />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <SelectField label="Select Type" {...register("status")} error={errors.status?.message}>
          <option value="">Select Type</option>
          {ATTENDANCE_STATUS.map((item) => (
            <option value={item.value}>{item.title}</option>
          ))}
        </SelectField>

        <SelectField label="Biometric Verified" {...register("biometricVerified")} error={errors.biometricVerified?.message}>
          <option value="true">Verified</option>
          <option value="false">Not Verified</option>
        </SelectField>
      </div>

      <div className="flex justify-end">
        <button type="submit" className="px-5 py-2.5 bg-accent hover:bg-accent-hover rounded-xl text-white font-medium transition-colors">
          Mark Attendance
        </button>
      </div>
    </form>
  );
};

export default MarkAttendanceForm;

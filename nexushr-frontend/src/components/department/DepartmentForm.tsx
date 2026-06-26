import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/state/store";

import { toast } from "react-toastify";
import { useEffect } from "react";
import { getAllEmployees } from "@/state/employeeSlice";
import { createDepartment, updateDepartment } from "@/state/departmentSlice";
import { departmentSchema, type DepartmentFormData } from "@/validations/departmentSchema";
import InputField from "../common/InputField";
import SelectField from "../common/SelectField";
import type { Department } from "@/types/DepartmentTypes";

interface Props {
  selectedDepartment?: Department | null;
  onSuccess: () => void;
}
const DepartmentForm = ({ selectedDepartment, onSuccess }: Props) => {
  const dispath = useAppDispatch();
  const { employee } = useAppSelector((store) => store);
  const jwt = localStorage.getItem("jwt");
  const isEditMode = selectedDepartment !== null;

  useEffect(() => {
    dispath(getAllEmployees());
  }, [jwt]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DepartmentFormData>({
    resolver: zodResolver(departmentSchema),
  });

  useEffect(() => {
    if (selectedDepartment) {
      reset({
        name: selectedDepartment.name,
        description: selectedDepartment.description,
        managerId: selectedDepartment.managerId ?? undefined,
        isActive: String(selectedDepartment.isActive) as "true" | "false",
      });
    } else {
      reset();
    }
  }, [selectedDepartment, reset]);

  const onSubmit = async (data: DepartmentFormData) => {
    try {
      if (isEditMode) {
        await dispath(updateDepartment({ id: selectedDepartment!.id, departmentData: data })).unwrap();

        toast.success("Department updated successfully");
      } else {
        await dispath(createDepartment(data)).unwrap();
        toast.success("Department created successfully");
      }
      reset();
      onSuccess();
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-card-bg border border-slate-800 rounded-2xl p-6 space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white">{isEditMode ? "Edit Department" : "Add Department"}</h2>

        <p className="text-slate-400 text-sm">{isEditMode ? "Update department" : "Add new department"}</p>
      </div>

      {/* Personal Information */}

      <div>
        <h3 className="text-sm font-medium text-orange-400 mb-4">Department Information</h3>

        <div className="grid md:grid-cols-2 gap-4">
          <InputField label="Department Name" placeholder="HR Department" {...register("name")} error={errors.name?.message} />

          <InputField label="Description" placeholder="Write description here..." {...register("description")} error={errors.description?.message} />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <SelectField
            label="Employee"
            {...register("managerId", { setValueAs: (value) => (value === "" ? undefined : Number(value)) })}
            error={errors.managerId?.message}>
            <option value="">Select Manager</option>
            {employee.employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.firstName} {employee.lastName}
              </option>
            ))}
          </SelectField>

          <SelectField label="Status" {...register("isActive")} error={errors.isActive?.message}>
            <option value="true">ACTIVE</option>
            <option value="false">INACTIVE</option>
          </SelectField>
        </div>
      </div>

      <div className="flex justify-end">
        <button type="submit" className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium transition-all">
          {isEditMode ? "Update Department" : "Add Department"}
        </button>
      </div>
    </form>
  );
};

export default DepartmentForm;

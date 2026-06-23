import { useFormContext } from "react-hook-form";
import InputField from "../common/InputField";
import SelectField from "../common/SelectField";
import type { EmployeeProfileFormData } from "../validation/employeeSchema";

interface Department {
  id: number;
  name: string;
}

interface EmployeeDetailsStepProps {
  departments: Department[];
}

const EmployeeDetailsStep = ({ departments }: EmployeeDetailsStepProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<EmployeeProfileFormData>();

  return (
    <div>
      {/* Personal Information */}
      <div className="bg-card-bg border border-slate-800 rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-6 text-white">Personal Information</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <InputField
            label="First Name"
            placeholder="Enter first name"
            {...register("employee.firstName")}
            error={errors.employee?.firstName?.message}
          />

          <InputField label="Last Name" placeholder="Enter last name" {...register("employee.lastName")} error={errors.employee?.lastName?.message} />

          <InputField label="Email" type="email" placeholder="Enter email" {...register("employee.email")} error={errors.employee?.email?.message} />

          <InputField label="Phone" placeholder="Enter phone number" {...register("employee.phone")} error={errors.employee?.phone?.message} />

          <InputField label="Date Of Birth" type="date" {...register("employee.dateOfBirth")} error={errors.employee?.dateOfBirth?.message} />

          <SelectField label="Gender" {...register("employee.gender")} error={errors.employee?.gender?.message}>
            <option value="">Select Gender</option>

            <option value="MALE">Male</option>

            <option value="FEMALE">Female</option>

            <option value="OTHER">Other</option>
          </SelectField>
        </div>

        {/* Employment Information */}

        <h2 className="text-xl font-semibold text-white my-6">Employment Information</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <SelectField
            label="Department"
            {...register("employee.departmentId", {
              valueAsNumber: true,
            })}
            error={errors.employee?.departmentId?.message}>
            <option value="">Select Department</option>

            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </SelectField>

          <InputField label="Designation" {...register("employee.designation")} error={errors.employee?.designation?.message} />

          <SelectField label="Role" {...register("employee.role")} error={errors.employee?.role?.message}>
            <option value="">Select Role</option>

            <option value="ADMIN">ADMIN</option>

            <option value="MANAGER">MANAGER</option>

            <option value="EMPLOYEE">EMPLOYEE</option>
          </SelectField>

          <SelectField label="Status" {...register("employee.status")} error={errors.employee?.status?.message}>
            <option value="">Select Status</option>

            <option value="ACTIVE">ACTIVE</option>

            <option value="INACTIVE">INACTIVE</option>
          </SelectField>

          <SelectField label="Employment Type" {...register("employee.employmentType")} error={errors.employee?.employmentType?.message}>
            <option value="">Select Employment Type</option>

            <option value="FULL_TIME">FULL TIME</option>

            <option value="PART_TIME">PART TIME</option>

            <option value="CONTRACT">CONTRACT</option>

            <option value="INTERN">INTERN</option>
          </SelectField>

          <InputField label="Joining Date" type="date" {...register("employee.joiningDate")} error={errors.employee?.joiningDate?.message} />

          <InputField
            label="Probation End Date"
            type="date"
            {...register("employee.probationEndDate")}
            error={errors.employee?.probationEndDate?.message}
          />

          <InputField
            label="Confirmation Date"
            type="date"
            {...register("employee.confirmationDate")}
            error={errors.employee?.confirmationDate?.message}
          />
        </div>

        {/* Emergency Contact */}

        <h2 className="text-xl font-semibold text-white mb-6">Emergency Contact</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <InputField
            label="Emergency Contact Name"
            {...register("employee.emergencyContactName")}
            error={errors.employee?.emergencyContactName?.message}
          />

          <InputField
            label="Emergency Contact Number"
            {...register("employee.emergencyContactNumber")}
            error={errors.employee?.emergencyContactNumber?.message}
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailsStep;

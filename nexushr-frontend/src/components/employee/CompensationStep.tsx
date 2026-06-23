import { useFormContext } from "react-hook-form";
import InputField from "../common/InputField";
import type { EmployeeProfileFormData } from "../validation/employeeSchema";

const CompensationStep = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<EmployeeProfileFormData>();

  return (
    <div className="space-y-6">
      {/* Salary Information */}

      <div className="bg-card-bg border border-slate-800 rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Salary Information</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <InputField
            label="Basic Salary"
            type="number"
            {...register("compensation.basicSalary", {
              valueAsNumber: true,
            })}
            error={errors.compensation?.basicSalary?.message}
          />

          <InputField
            label="CTC"
            type="number"
            {...register("compensation.ctc", {
              valueAsNumber: true,
            })}
            error={errors.compensation?.ctc?.message}
          />
        </div>
      </div>

      {/* Banking Information */}

      <div className="bg-card-bg border border-slate-800 rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Banking Information</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <InputField label="Bank Name" {...register("compensation.bankName")} error={errors.compensation?.bankName?.message} />

          <InputField label="Account Number" {...register("compensation.accountNumber")} error={errors.compensation?.accountNumber?.message} />

          <InputField label="IFSC Code" {...register("compensation.ifscCode")} error={errors.compensation?.ifscCode?.message} />
        </div>
      </div>

      {/* Government Information */}

      <div className="bg-card-bg border border-slate-800 rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Government Information</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <InputField label="PAN Number" {...register("compensation.panNumber")} error={errors.compensation?.panNumber?.message} />

          <InputField label="UAN Number" {...register("compensation.uanNumber")} error={errors.compensation?.uanNumber?.message} />

          <InputField label="PF Number" {...register("compensation.pfNumber")} error={errors.compensation?.pfNumber?.message} />

          <InputField label="ESI Number" {...register("compensation.esiNumber")} error={errors.compensation?.esiNumber?.message} />
        </div>
      </div>
    </div>
  );
};

export default CompensationStep;

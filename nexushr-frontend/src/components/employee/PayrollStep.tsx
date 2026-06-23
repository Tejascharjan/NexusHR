import { Trash2, Plus } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";

import InputField from "../common/InputField";
import SelectField from "../common/SelectField";
import type { EmployeeProfileFormData } from "../validation/employeeSchema";

const PayrollStep = () => {
  const { control, register } = useFormContext<EmployeeProfileFormData>();

  const {
    fields: allowanceFields,
    append: addAllowance,
    remove: removeAllowance,
  } = useFieldArray({
    control,
    name: "allowances",
  });

  const {
    fields: deductionFields,
    append: addDeduction,
    remove: removeDeduction,
  } = useFieldArray({
    control,
    name: "deductions",
  });

  return (
    <div className="space-y-6">
      {/* Allowances */}

      <div className="bg-card-bg border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Allowances</h2>

          <button
            type="button"
            onClick={() =>
              addAllowance({
                allowanceName: "",
                amount: 0,
                taxable: true,
              })
            }
            className="
              flex
              items-center
              gap-2
              px-4
              py-2
              rounded-xl
              bg-orange-500
              hover:bg-orange-600
              text-white
              transition-all
            ">
            <Plus size={18} />
            Add Allowance
          </button>
        </div>

        {allowanceFields.length === 0 && <p className="text-slate-400">No allowances added yet.</p>}

        <div className="space-y-4">
          {allowanceFields.map((field, index) => (
            <div
              key={field.id}
              className="
                  border
                  border-slate-700
                  rounded-xl
                  p-4
                ">
              <div className="grid md:grid-cols-3 gap-4">
                <InputField label="Allowance Name" {...register(`allowances.${index}.allowanceName`)} />

                <InputField
                  type="number"
                  label="Amount"
                  {...register(`allowances.${index}.amount`, {
                    valueAsNumber: true,
                  })}
                />

                <SelectField label="Taxable" {...register(`allowances.${index}.taxable`, { setValueAs: (value) => value === "true" })}>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </SelectField>
              </div>

              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={() => removeAllowance(index)}
                  className="
                      flex
                      items-center
                      gap-2
                      px-4
                      py-2
                      rounded-xl
                      bg-red-500
                      hover:bg-red-600
                      text-white
                    ">
                  <Trash2 size={16} />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deductions */}

      <div className="bg-card-bg border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Deductions</h2>

          <button
            type="button"
            onClick={() =>
              addDeduction({
                deductionName: "",
                amount: 0,
              })
            }
            className="
              flex
              items-center
              gap-2
              px-4
              py-2
              rounded-xl
              bg-orange-500
              hover:bg-orange-600
              text-white
              transition-all
            ">
            <Plus size={18} />
            Add Deduction
          </button>
        </div>

        {deductionFields.length === 0 && <p className="text-slate-400">No deductions added yet.</p>}

        <div className="space-y-4">
          {deductionFields.map((field, index) => (
            <div
              key={field.id}
              className="
                  border
                  border-slate-700
                  rounded-xl
                  p-4
                ">
              <div className="grid md:grid-cols-2 gap-4">
                <InputField label="Deduction Name" {...register(`deductions.${index}.deductionName`)} />

                <InputField
                  type="number"
                  label="Amount"
                  {...register(`deductions.${index}.amount`, {
                    valueAsNumber: true,
                  })}
                />
              </div>

              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={() => removeDeduction(index)}
                  className="
                      flex
                      items-center
                      gap-2
                      px-4
                      py-2
                      rounded-xl
                      bg-red-500
                      hover:bg-red-600
                      text-white
                    ">
                  <Trash2 size={16} />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PayrollStep;

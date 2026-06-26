import SelectField from "../common/SelectField";
import InputField from "../common/InputField";
import type { Department } from "@/types/DepartmentTypes";

interface Props {
  filters: {
    month: number;
    year: number;
    departmentId?: number;
  };

  onChange: (filters: any) => void;

  departments: Department[];
}

const MonthlyAttendanceFilter = ({ filters, onChange, departments }: Props) => {
  return (
    <div className="bg-card-bg border border-slate-800 rounded-2xl p-6 grid md:grid-cols-3 gap-4 ">
      <SelectField
        label="Month"
        value={filters.month}
        onChange={(e) =>
          onChange({
            ...filters,
            month: Number(e.target.value),
          })
        }>
        {Array.from({ length: 12 }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </SelectField>

      <InputField
        type="number"
        label="Year"
        value={filters.year}
        onChange={(e) =>
          onChange({
            ...filters,
            year: Number(e.target.value),
          })
        }
      />

      <SelectField
        label="Department"
        value={filters.departmentId ?? ""}
        onChange={(e) =>
          onChange({
            ...filters,
            departmentId: e.target.value ? Number(e.target.value) : undefined,
          })
        }>
        <option value="">All Departments</option>

        {departments.map((dept) => (
          <option key={dept.id} value={dept.id}>
            {dept.name}
          </option>
        ))}
      </SelectField>
    </div>
  );
};

export default MonthlyAttendanceFilter;

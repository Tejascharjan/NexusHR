import InputField from "../common/InputField";
import SelectField from "../common/SelectField";

interface Props {
  filters: any;
  setFilters: React.Dispatch<React.SetStateAction<any>>;
}

const PayrollFilters = ({ filters, setFilters }: Props) => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-card-bg border border-slate-800 rounded-2xl p-6 ">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SelectField
          label="Payroll Month"
          value={filters.payrollMonth ?? ""}
          onChange={(e) =>
            setFilters((prev: any) => ({
              ...prev,
              payrollMonth: e.target.value ? Number(e.target.value) : undefined,
              page: 0,
            }))
          }>
          <option value="">All Months</option>

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
        </SelectField>

        <SelectField
          label="Payroll Year"
          value={filters.payrollYear ?? ""}
          onChange={(e) => setFilters((prev: any) => ({ ...prev, payrollYear: e.target.value ? Number(e.target.value) : undefined, page: 0 }))}>
          <option value="">All Years</option>

          {Array.from({ length: 5 }).map((_, index) => {
            const year = currentYear - index;

            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </SelectField>

        <SelectField
          label="Status"
          value={filters.status ?? ""}
          onChange={(e) => setFilters((prev: any) => ({ ...prev, status: e.target.value ? e.target.value : undefined, page: 0 }))}>
          <option value="">All Status</option>
          <option value="PAID">Paid</option>
          <option value="DRAFT">Draft</option>
        </SelectField>

        {/* Search */}

        <InputField label="Employee Search" placeholder="Search employee..." />
      </div>
    </div>
  );
};

export default PayrollFilters;

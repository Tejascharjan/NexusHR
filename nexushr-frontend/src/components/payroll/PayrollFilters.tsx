import InputField from "../common/InputField";
import SelectField from "../common/SelectField";

const PayrollFilters = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div
      className="
        bg-card-bg
        border
        border-slate-800
        rounded-2xl
        p-6
      ">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {/* Month */}

        <SelectField label="Payroll Month">
          <option value="">All Months</option>

          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </SelectField>

        {/* Year */}

        <SelectField label="Payroll Year">
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

        {/* Status */}

        <SelectField label="Status">
          <option value="">All Status</option>

          <option value="PROCESSED">Processed</option>

          <option value="PAID">Paid</option>

          <option value="FAILED">Failed</option>
        </SelectField>

        {/* Search */}

        <InputField label="Employee Search" placeholder="Search employee..." />
      </div>
    </div>
  );
};

export default PayrollFilters;

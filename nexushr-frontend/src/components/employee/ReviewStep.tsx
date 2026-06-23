import { useFormContext, useWatch } from "react-hook-form";
import type { EmployeeProfileFormData } from "../validation/employeeSchema";

const ReviewStep = () => {
  const { control } = useFormContext<EmployeeProfileFormData>();

  const data = useWatch({
    control,
  });

  return (
    <div className="space-y-6">
      {/* Employee Information */}

      <div className="bg-card-bg border border-slate-800 rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Employee Information</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-slate-400 text-sm">First Name</p>
            <p className="text-white">{data.employee?.firstName}</p>
          </div>

          <div>
            <p className="text-slate-400 text-sm">Last Name</p>
            <p className="text-white">{data.employee?.lastName}</p>
          </div>

          <div>
            <p className="text-slate-400 text-sm">Email</p>
            <p className="text-white">{data.employee?.email}</p>
          </div>

          <div>
            <p className="text-slate-400 text-sm">Phone</p>
            <p className="text-white">{data.employee?.phone}</p>
          </div>

          <div>
            <p className="text-slate-400 text-sm">Gender</p>
            <p className="text-white">{data.employee?.gender}</p>
          </div>

          <div>
            <p className="text-slate-400 text-sm">Date Of Birth</p>
            <p className="text-white">{data.employee?.dateOfBirth}</p>
          </div>
        </div>
      </div>

      {/* Employment Information */}

      <div className="bg-card-bg border border-slate-800 rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Employment Information</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-slate-400 text-sm">Department ID</p>
            <p className="text-white">{data.employee?.departmentId}</p>
          </div>

          <div>
            <p className="text-slate-400 text-sm">Designation</p>
            <p className="text-white">{data.employee?.designation}</p>
          </div>

          <div>
            <p className="text-slate-400 text-sm">Role</p>
            <p className="text-white">{data.employee?.role}</p>
          </div>

          <div>
            <p className="text-slate-400 text-sm">Status</p>
            <p className="text-white">{data.employee?.status}</p>
          </div>

          <div>
            <p className="text-slate-400 text-sm">Employment Type</p>
            <p className="text-white">{data.employee?.employmentType}</p>
          </div>

          <div>
            <p className="text-slate-400 text-sm">Joining Date</p>
            <p className="text-white">{data.employee?.joiningDate}</p>
          </div>
        </div>
      </div>

      {/* Emergency Contact */}

      <div className="bg-card-bg border border-slate-800 rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Emergency Contact</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-slate-400 text-sm">Contact Name</p>
            <p className="text-white">{data.employee?.emergencyContactName}</p>
          </div>

          <div>
            <p className="text-slate-400 text-sm">Contact Number</p>
            <p className="text-white">{data.employee?.emergencyContactNumber}</p>
          </div>
        </div>
      </div>

      {/* Compensation */}

      <div className="bg-card-bg border border-slate-800 rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Compensation Information</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-slate-400 text-sm">Basic Salary</p>
            <p className="text-white">₹ {data.compensation?.basicSalary}</p>
          </div>

          <div>
            <p className="text-slate-400 text-sm">CTC</p>
            <p className="text-white">₹ {data.compensation?.ctc}</p>
          </div>

          <div>
            <p className="text-slate-400 text-sm">Bank Name</p>
            <p className="text-white">{data.compensation?.bankName}</p>
          </div>

          <div>
            <p className="text-slate-400 text-sm">Account Number</p>
            <p className="text-white">{data.compensation?.accountNumber}</p>
          </div>

          <div>
            <p className="text-slate-400 text-sm">IFSC Code</p>
            <p className="text-white">{data.compensation?.ifscCode}</p>
          </div>

          <div>
            <p className="text-slate-400 text-sm">PAN Number</p>
            <p className="text-white">{data.compensation?.panNumber}</p>
          </div>

          <div>
            <p className="text-slate-400 text-sm">UAN Number</p>
            <p className="text-white">{data.compensation?.uanNumber}</p>
          </div>

          <div>
            <p className="text-slate-400 text-sm">PF Number</p>
            <p className="text-white">{data.compensation?.pfNumber}</p>
          </div>

          <div>
            <p className="text-slate-400 text-sm">ESI Number</p>
            <p className="text-white">{data.compensation?.esiNumber}</p>
          </div>
        </div>
      </div>

      {/* Allowances */}

      <div className="bg-card-bg border border-slate-800 rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Allowances</h2>

        {data.allowances?.length ? (
          <div className="space-y-3">
            {data.allowances.map((allowance, index) => (
              <div key={index} className="border border-slate-700 rounded-xl p-4">
                <p className="text-white">{allowance.allowanceName}</p>

                <p className="text-slate-400">₹ {allowance.amount}</p>

                <p className="text-slate-400">Taxable : {allowance.taxable ? "Yes" : "No"}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-400">No allowances added.</p>
        )}
      </div>

      {/* Deductions */}

      <div className="bg-card-bg border border-slate-800 rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Deductions</h2>

        {data.deductions?.length ? (
          <div className="space-y-3">
            {data.deductions.map((deduction, index) => (
              <div key={index} className="border border-slate-700 rounded-xl p-4">
                <p className="text-white">{deduction.deductionName}</p>

                <p className="text-slate-400">₹ {deduction.amount}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-400">No deductions added.</p>
        )}
      </div>
    </div>
  );
};

export default ReviewStep;

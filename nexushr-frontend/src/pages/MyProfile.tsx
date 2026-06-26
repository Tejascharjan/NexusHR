import { User, Mail, Phone, Calendar, Building2, Briefcase, IndianRupee, Wallet } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAppDispatch, useAppSelector } from "@/state/store";
import { useEffect } from "react";
import { getEmployeeDetails } from "@/state/employeeSlice";

export default function MyProfile() {
  const dispatch = useAppDispatch();
  const { employeeDetails } = useAppSelector((store) => store.employee);

  useEffect(() => {
    dispatch(getEmployeeDetails());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="bg-card-bg border-border">
        <CardContent className="flex items-center gap-5 py-6">
          <Avatar className="h-20 w-20">
            <AvatarFallback className="bg-orange-500 text-white text-lg font-bold">TC</AvatarFallback>
          </Avatar>

          <div>
            <h1 className="text-2xl font-bold text-white">
              {employeeDetails?.employee.firstName} {employeeDetails?.employee?.lastName}
            </h1>

            <p className="text-slate-400">Employee ID: {employeeDetails?.employee?.employeeCode}</p>

            <div className="mt-2 flex gap-2">
              <span className="rounded-full bg-orange-500/20 px-3 py-1 text-xs text-orange-400">{employeeDetails?.employee?.designation}</span>

              <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">{employeeDetails?.employee?.departmentName}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Information Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Personal Information */}
        <Card className="bg-card-bg border-border">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <InfoRow
              icon={<User size={18} />}
              label="Full Name"
              value={`${employeeDetails?.employee?.firstName} ${employeeDetails?.employee?.lastName}`}
            />

            <InfoRow icon={<Mail size={18} />} label="Email" value={employeeDetails?.employee?.email} />

            <InfoRow icon={<Phone size={18} />} label="Phone" value={employeeDetails?.employee?.phone} />

            <InfoRow icon={<Calendar size={18} />} label="Date of Birth" value={employeeDetails?.employee?.dateOfBirth} />
          </CardContent>
        </Card>

        {/* Employment Information */}
        <Card className="bg-card-bg border-border">
          <CardHeader>
            <CardTitle>Employment Information</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <InfoRow icon={<Building2 size={18} />} label="Department" value={employeeDetails?.employee?.departmentName} />

            <InfoRow icon={<Briefcase size={18} />} label="Designation" value={employeeDetails?.employee?.designation} />

            <InfoRow icon={<Calendar size={18} />} label="Joining Date" value={employeeDetails?.employee?.joiningDate} />

            <InfoRow icon={<Wallet size={18} />} label="Employment Type" value={employeeDetails?.employee?.employmentType} />
          </CardContent>
        </Card>

        {/* Compensation */}
        <Card className="bg-card-bg border-border">
          <CardHeader>
            <CardTitle>Compensation Summary</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <SalaryRow label="Basic Salary" value={employeeDetails?.compensation?.basicSalary} />

            <SalaryRow label="CTC Salary" value={employeeDetails?.compensation?.ctc} highlight />
          </CardContent>
        </Card>

        {/* Allowances */}
        <Card className="bg-card-bg border-border">
          <CardHeader>
            <CardTitle>Allowances</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            {employeeDetails?.allowances?.map((allowance) => (
              <SalaryRow key={allowance.allowanceName} label={allowance.allowanceName} value={allowance.amount} />
            ))}
          </CardContent>
        </Card>

        {/* Deductions */}
        <Card className="bg-card-bg border-border lg:col-span-2">
          <CardHeader>
            <CardTitle>Deductions</CardTitle>
          </CardHeader>

          <CardContent className="grid gap-4 md:grid-cols-3">
            {employeeDetails?.deductions?.map((deduction) => (
              <div key={deduction.deductionName} className="rounded-lg border border-red-500/20 bg-red-500/10 p-4">
                <p className="text-sm text-slate-400">{deduction.deductionName}</p>

                <p className="mt-2 text-lg font-semibold text-red-400">₹{deduction.amount.toLocaleString()}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-orange-500">{icon}</div>

      <div>
        <p className="text-xs text-slate-400">{label}</p>
        <p className="text-sm text-white">{value}</p>
      </div>
    </div>
  );
}

function SalaryRow({ label, value, highlight = false }: { label: string; value: number; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-700 p-3">
      <div className="flex items-center gap-2">
        <IndianRupee size={16} className="text-orange-500" />
        <span>{label}</span>
      </div>

      <span className={`font-semibold ${highlight ? "text-orange-500" : "text-white"}`}>₹{value}</span>
    </div>
  );
}

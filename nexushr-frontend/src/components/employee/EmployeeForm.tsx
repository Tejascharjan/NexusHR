import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import EmployeeStepper from "./EmployeeStepper";
import EmployeeDetailsStep from "./EmployeeDetailsStep";
import CompensationStep from "./CompensationStep";
import PayrollStep from "./PayrollStep";
import ReviewStep from "./ReviewStep";

import { useAppDispatch, useAppSelector } from "@/state/store";

import { getAllDepartments } from "@/state/departmentSlice";
import { createEmployee } from "@/state/employeeSlice";
import { employeeProfileSchema, type EmployeeProfileFormData } from "@/validations/employeeSchema";

const EmployeeForm = () => {
  const dispatch = useAppDispatch();

  const { department } = useAppSelector((store) => store);

  const [step, setStep] = useState(1);

  const methods = useForm<EmployeeProfileFormData>({
    resolver: zodResolver(employeeProfileSchema),
    mode: "onChange",
    defaultValues: {
      employee: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        gender: "",

        dateOfBirth: "",

        emergencyContactName: "",
        emergencyContactNumber: "",

        departmentId: undefined,

        designation: "",

        joiningDate: "",

        probationEndDate: "",
        confirmationDate: "",

        status: "ACTIVE",

        role: "EMPLOYEE",

        employmentType: "",
      },

      compensation: {
        basicSalary: 0,
        ctc: 0,

        bankName: "",
        accountNumber: "",
        ifscCode: "",

        panNumber: "",
        uanNumber: "",
        pfNumber: "",
        esiNumber: "",
      },

      allowances: [],

      deductions: [],
    },
  });

  const { handleSubmit, trigger, reset } = methods;

  useEffect(() => {
    dispatch(getAllDepartments());
  }, [dispatch]);

  const nextStep = async () => {
    if (step === 3) {
      requestAnimationFrame(() => {
        setStep(4);
      });
      return;
    }
    let fieldsToValidate: string[] = [];

    if (step === 1) {
      fieldsToValidate = [
        "employee.firstName",
        "employee.lastName",
        "employee.email",
        "employee.phone",
        "employee.dateOfBirth",
        "employee.gender",
        "employee.departmentId",
        "employee.designation",
        "employee.joiningDate",
        "employee.role",
        "employee.status",
        "employee.employmentType",
      ];
    }

    if (step === 2) {
      fieldsToValidate = [
        "compensation.basicSalary",
        "compensation.ctc",
        "compensation.bankName",
        "compensation.accountNumber",
        "compensation.ifscCode",
        "compensation.panNumber",
      ];
    }

    const valid = await trigger(fieldsToValidate as any);

    if (valid) {
      setStep((prev) => prev + 1);
    }
  };

  const previousStep = () => {
    setStep((prev) => prev - 1);
  };

  const onSubmit = async (data: EmployeeProfileFormData) => {
    try {
      await dispatch(createEmployee(data)).unwrap();
      toast.success("Employee created successfully");

      reset();

      setStep(1);
    } catch (error) {
      toast.error("Failed to create employee");
    }
  };

  return (
    <div className="space-y-6">
      <EmployeeStepper currentStep={step} />

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {step === 1 && <EmployeeDetailsStep departments={department.departments} />}

          {step === 2 && <CompensationStep />}

          {step === 3 && <PayrollStep />}

          {step === 4 && <ReviewStep />}

          <div className="flex justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={previousStep}
                className="px-5 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white transition-all">
                Previous
              </button>
            ) : (
              <div />
            )}

            {step === 4 ? (
              <button type="submit" className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white transition-all">
                Create Employee
              </button>
            ) : (
              <button type="button" onClick={nextStep} className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white transition-all">
                {step === 3 ? "Review Form" : "Next"}
              </button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default EmployeeForm;

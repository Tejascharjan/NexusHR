import { z } from "zod";

const nameRegex = /^[A-Za-z\s]+$/;

const employeeSchema = z.object({
  firstName: z.string().trim().min(2, "First name must be at least 2 characters").max(50, "First name can not exceed 50 characters").regex(nameRegex, "First name should contain only letters"),

  lastName: z.string().trim().min(2, "Last name must be at least 2 characters").max(50, "Last name can not exceed 50 characters").regex(nameRegex, "Last name should contain only letters"),

  email: z.string().trim().email("Please enter valid email address"),

  phone: z.string().trim().min(1, "Phone is required").regex(/^[6-9]\d{9}$/, "Please enter valid 10 digit mobile number"),

  gender: z.string().min(1, "Gender is required"),

  dateOfBirth: z.string().min(1, "Date of birth is required").refine((date) => {
    const dob = new Date(date);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age >= 18;
  }, { message: "Employee must be at least 18 years old" }),

  emergencyContactName: z.string().trim().optional(),

  emergencyContactNumber: z.string().trim().optional().refine((value) => !value || /^[6-9]\d{9}$/.test(value), { message: "Enter valid emergency contact number" }),

  departmentId: z.number().min(1, "Department is required"),

  designation: z.string().trim().min(2, "Designation is required").max(100, "Designation can not exceed 100 characters"),

  joiningDate: z.string().min(1, "Joining date is required"),

  probationEndDate: z.string().optional(),
  confirmationDate: z.string().optional(),

  status: z.string().min(1, "Status is required"),

  role: z.string().min(1, "Role is required"),

  employmentType: z.string().min(1, "Employment type is required"),
});

const compensationSchema = z.object({
  basicSalary: z.number().min(1000, "Basic salary must be at least ₹1,000").max(10000000, "Basic salary is too high"),

  ctc: z.number().min(1000, "CTC must be at least ₹1,000").max(100000000, "CTC is too high"),

  bankName: z.string().trim().min(2, "Bank name is required").max(100, "Bank name is too long").regex(/^[A-Za-z\s.&()-]+$/, "Bank name contains invalid characters"),

  accountNumber: z.string().trim().min(9, "Account number must be at least 9 digits").max(18, "Account number cannot exceed 18 digits")
    .regex(/^\d+$/, "Account number must contain only digits"),

  ifscCode: z.string().trim().min(1, "IFSC code is required").regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code"),

  panNumber: z.string().trim().min(1, "PAN number is required").regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN number"),

  uanNumber: z.string().trim().regex(/^\d{12}$/, "UAN must be exactly 12 digits").or(z.literal("")).optional(),

  pfNumber: z.string().trim().min(5, "Invalid PF number").or(z.literal("")).optional(),

  esiNumber: z.string().trim().regex(/^\d{10,17}$/, "Invalid ESI number").or(z.literal("")).optional(),

}).refine((data) => data.ctc >= data.basicSalary, {
  message: "CTC must be greater than or equal to Basic Salary", path: ["ctc"],
});

const allowanceSchema = z.object({
  allowanceName: z.string().min(1, "Name is required"),
  amount: z.number({ error: "Amount is required" }),
  taxable: z.boolean().optional(),
});

const deductionSchema = z.object({
  deductionName: z.string().min(1, "Name is required"),
  amount: z.number({ error: "Amount is required" }),
});

export const employeeProfileSchema = z.object({
  employee: employeeSchema,
  compensation: compensationSchema,
  allowances: z.array(allowanceSchema).optional(),
  deductions: z.array(deductionSchema).optional(),
});

export type EmployeeProfileFormData = z.infer<typeof employeeProfileSchema>;
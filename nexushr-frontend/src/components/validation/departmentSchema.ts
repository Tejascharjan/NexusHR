import { z } from "zod";

export const departmentSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Department name must be at least 2 characters")
    .max(50, "Department name cannot exceed 50 characters")
    .regex(
      /^[A-Za-z\s]+$/,
      "Department name can contain only letters and spaces",
    ),

  description: z.string().trim().optional().or(z.literal("")),

  managerId: z.number().optional(),

  isActive: z.enum(["true", "false"], {
    message: "Please select department status",
  }),
});

export type DepartmentFormData = z.infer<typeof departmentSchema>;

import { z } from "zod"
export const leaveSchema = z.object({
     employeeId: z.number()
          .int("Invalid employee")
          .positive("Please select employee"),

     leaveType: z.enum(
          [
               "SICK",
               "CASUAL",
               "ANNUAL",
               "MATERNITY",
               "PATERNITY",
               "UNPAID",
          ],
          {
               message: "Please select leave type",
          }
     ),

     fromDate: z.string().min(1, "Start date is required"),

     toDate: z.string().min(1, "End date is required"),

     reason: z
          .string()
          .trim()
          .min(5, "Reason must be at least 5 characters")
          .max(500, "Reason cannot exceed 500 characters"),
});

export type LeaveFormData = z.infer<typeof leaveSchema>
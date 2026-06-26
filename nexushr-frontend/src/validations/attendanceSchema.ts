import { z } from "zod";

export const attendanceSchema = z.object({
  employeeId: z
    .number()
    .int("Invalid employee selected")
    .positive("Please select an employee"),

  date: z.string().min(1, "Attendance data is required"),
  checkIn: z.string().optional().or(z.literal("")),
  checkOut: z.string().optional().or(z.literal("")),
  status: z.enum(["PRESENT", "ABSENT", "LATE", "HALF_DAY"], {
    message: "Please select attendace status",
  }),
  biometricVerified: z.enum(["true", "false"], {
    message: "Please select biometric verification status",
  }),
  workedHours: z
    .number()
    .min(0, "Worked hours cannot be negative")
    .max(24, "Worked hours cannot exceed 24")
    .optional(),
});

export type AttendanceFormData = z.infer<typeof attendanceSchema>;

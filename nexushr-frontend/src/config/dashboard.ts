import {
  Users,
  Building2,
  IndianRupee,
  Calendar,
  Clock,
  Briefcase,
} from "lucide-react";

export const DASHBOARD_STATS_CONFIG = {
  ADMIN: [
    {
      key: "activeEmployees",
      title: "Active Employees",
      icon: Users,
    },
    {
      key: "totalDepartments",
      title: "Departments",
      icon: Building2,
    },
    {
      key: "totalPayroll",
      title: "Payroll",
      icon: IndianRupee,
    },
    {
      key: "attendancePercentage",
      title: "Attendance",
      icon: Calendar,
    },
  ],

  MANAGER: [
    {
      key: "teamMembers",
      title: "Team Members",
      icon: Users,
    },
    {
      key: "pendingLeaves",
      title: "Pending Leaves",
      icon: Clock,
    },
    {
      key: "attendancePercentage",
      title: "Attendance",
      icon: Calendar,
    },
  ],

  EMPLOYEE: [
    {
      key: "assignedTasks",
      title: "Assigned Tasks",
      icon: Briefcase,
    },
    {
      key: "remainingLeaves",
      title: "Remaining Leaves",
      icon: Clock,
    },
    {
      key: "attendancePercentage",
      title: "Attendance",
      icon: Calendar,
    },
  ],
};

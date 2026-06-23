import {
  Home,
  Users,
  Building2,
  IndianRupee,
  Briefcase,
  CalendarCheck,
  CalendarDays,
  ClipboardList,
  BarChart3,
  Star,
} from "lucide-react";

export interface NavigationItem {
  title: string;
  icon: any;
  path: string;
}

export type Role = "ADMIN" | "MANAGER" | "EMPLOYEE";

export const NAVIGATION_CONFIG: Record<Role, NavigationItem[]> = {
  ADMIN: [
    {
      title: "Dashboard",
      icon: Home,
      path: "/admin/dashboard",
    },
    {
      title: "Departments",
      icon: Building2,
      path: "/admin/departments",
    },
    {
      title: "Employees",
      icon: Users,
      path: "/admin/employees",
    },
    {
      title: "Attendance",
      icon: CalendarCheck,
      path: "/admin/attendance",
    },
    {
      title: "Monthly Attendance",
      icon: CalendarDays,
      path: "/admin/monthly-attendance",
    },
    {
      title: "Leaves",
      icon: ClipboardList,
      path: "/admin/leaves",
    },
    {
      title: "Payroll",
      icon: IndianRupee,
      path: "/admin/payroll",
    },
    {
      title: "Performance",
      icon: Star,
      path: "/admin/performance",
    },
    {
      title: "Reports",
      icon: BarChart3,
      path: "/admin/reports",
    },
  ],

  MANAGER: [
    {
      title: "Dashboard",
      icon: Home,
      path: "/manager/dashboard",
    },
    {
      title: "Employees",
      icon: Users,
      path: "/manager/employees",
    },
    {
      title: "Team Leaves",
      icon: CalendarDays,
      path: "/manager/leaves",
    }
  ],

  EMPLOYEE: [
    {
      title: "Dashboard",
      icon: Home,
      path: "/employee/dashboard",
    },
    {
      title: "My Tasks",
      icon: Briefcase,
      path: "/employee/tasks",
    },
    {
      title: "My Leaves",
      icon: CalendarDays,
      path: "/employee/leaves",
    }
  ],
};

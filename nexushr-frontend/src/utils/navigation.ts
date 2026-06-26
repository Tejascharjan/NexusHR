import {
  Home,
  Users,
  Building2,
  IndianRupee,
  CalendarCheck,
  CalendarDays,
  ClipboardList,
  BarChart3,
  Star,
  User,
  LayoutDashboard,
  Clock3,
  Receipt,
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
      icon: LayoutDashboard,
      path: "/employee/dashboard",
    },
    {
      title: "My Profile",
      icon: User,
      path: "/employee/profile"
    },
    {
      title: "Attendance",
      icon: Clock3,
      path: "/employee/attendance"
    },
    {
      title: "Leaves",
      icon: CalendarDays,
      path: "/employee/leaves",
    },
    {
      title: "Payroll",
      icon: Receipt,
      path: "/employee/payroll",
    },
  ],
};

import { UserCheck, UserX, Clock3, Timer } from "lucide-react";

export const ATTENDANCE_STATS_CONFIG = [
  {
    key: "present",
    title: "Present",
    icon: UserCheck,
  },
  {
    key: "absent",
    title: "Absent",
    icon: UserX,
  },
  {
    key: "late",
    title: "Late",
    icon: Clock3,
  },
  {
    key: "workedHours",
    title: "Worked Hours",
    icon: Timer,
  },
];

export const ATTENDANCE_STATUS = [
  {
    title: "PRESENT",
    value: "PRESENT",
  },
  {
    title: "ABSENT",
    value: "ABSENT",
  },
  {
    title: "HALF_DAY",
    value: "HALF_DAY",
  },
  {
    title: "HOLIDAY",
    value: "HOLIDAY",
  },
  {
    title: "WEEKEND",
    value: "WEEKEND",
  },
];

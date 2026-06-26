import { Bell, ChevronDown } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { useAppSelector } from "@/state/store";

const Header = () => {
  const { user } = useAppSelector((store) => store.auth);

  const getInitials = (name?: string) => {
    if (!name) return "HR";

    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="h-16 border-b border-slate-800/60 bg-[#020817]/80 backdrop-blur-md sticky top-0 z-50">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left Section */}

        <div className="flex items-center gap-6">
          <div>
            <h1 className="text-lg font-semibold text-slate-100">Dashboard</h1>

            <p className="text-xs text-slate-500">Welcome back, {user?.name}</p>
          </div>

          {/* Search */}

          {/* <div className="hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />

              <Input
                placeholder="Search employees, departments..."
                className="w-80 pl-10 bg-card-bg border-slate-800 focus-visible:ring-orange-500 text-slate-200"
              />
            </div>
          </div> */}
        </div>

        {/* Right Section */}

        <div className="flex items-center gap-4">
          {/* Role Badge */}

          <div className="hidden md:flex items-center px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20">
            <span className="text-xs font-medium text-orange-400">{user?.role}</span>
          </div>

          {/* Notifications */}

          <button className="relative p-2.5 rounded-xl border border-slate-800 bg-card-bg hover:border-orange-500/30 transition-all">
            <Bell className="w-5 h-5 text-slate-400" />

            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-orange-500" />
          </button>

          {/* User Profile */}

          <div
            className="flex items-center gap-3 px-3 py-2 rounded-xl border border-slate-800 bg-card-bg cursor-pointer hover:border-orange-500/30 
            transition-all
            ">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-orange-500/10 text-orange-400 font-semibold">{getInitials(user?.name)}</AvatarFallback>
            </Avatar>

            <div className="hidden lg:block">
              <p className="text-sm font-medium text-slate-200">{user?.name}</p>

              <p className="text-[11px] text-slate-500">{user?.email}</p>
            </div>

            <ChevronDown className="w-4 h-4 text-slate-500" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

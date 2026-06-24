import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/state/store";
import { NAVIGATION_CONFIG, type Role } from "@/types/navigation";
import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logout } from "@/state/authSlice";

const Sidebar = () => {
  const { user } = useAppSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const role: Role = (user?.role as Role) || "EMPLOYEE";
  const menus = NAVIGATION_CONFIG[role];

  const getUserInitials = (name: string) => {
    const names = name.split(" ");
    const initials = names.map((n) => n[0]).join("");
    return initials.toUpperCase().slice(0, 2);
  };

  const handleLogout = () => {
    dispatch(logout(navigate));
  };

  return (
    <aside className="w-60 bg-sidebar-bg border-r border-slate-800/60 flex flex-col h-full shrink-0">
      {/* Logo Section */}
      <div className="sticky top-0 z-20 bg-sidebar-bg">
        <div className="flex items-center gap-3 p-4 border-b border-slate-800/60">
          <div className="w-8 h-8 bg-linear-to-br from-orange-500 to-amber-600 rounded-lg flex items-center justify-center shadow-md">⚡</div>

          <div>
            <h2 className="font-semibold text-slate-100 text-sm">NexusHR</h2>
            <p className="text-[10px] uppercase tracking-wider text-slate-500">Enterprise</p>
          </div>
        </div>

        {/* Role Badge */}
        <div className="p-3 border-b border-slate-800/30">
          <span className="block text-center text-[11px] font-medium text-orange-400 border border-orange-500/20 bg-orange-500/10 rounded-full py-1 px-3">
            {role} PORTAL
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <NavLink
              key={menu.path}
              to={menu.path}
              end
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 relative text-left group border ${
                  isActive
                    ? "bg-orange-500/10 border-orange-500/20 text-orange-400 font-medium shadow-inner"
                    : "text-slate-400 hover:bg-slate-800/40 hover:text-slate-200 border-transparent"
                }`
              }>
              {({ isActive }) => (
                <>
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-orange-400" : "text-slate-500 group-hover:text-slate-300"}`} />

                  <span className="text-sm">{menu.title}</span>

                  {isActive && <span className="absolute right-3 w-1.5 h-1.5 bg-orange-500 rounded-full shadow-[0_0_8px_#f97316]" />}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* User Footer */}
      <div className="p-3 border-t border-slate-800/60">
        <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-3 flex items-center gap-3">
          <Avatar className="w-9 h-9 border border-orange-500/30 bg-orange-500/10">
            <AvatarFallback className="text-orange-400 font-semibold text-xs">{getUserInitials(user?.name || "User")}</AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-200 truncate">{user?.name || "Authenticated User"}</p>

            <p className="text-[11px] text-slate-500 uppercase tracking-wide">{role}</p>
          </div>

          <button className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-800/50 transition-all" onClick={handleLogout}>
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

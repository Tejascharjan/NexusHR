import SignInForm from "@/components/auth/SignInForm";
import { useState, useEffect } from "react";

const features = [
  {
    icon: "👥",
    title: "Employee Management",
    desc: "Centralized employee profiles, org charts, and team directories.",
  },
  {
    icon: "📅",
    title: "Leave & Attendance",
    desc: "Smart leave tracking with automated approval workflows.",
  },
  {
    icon: "💰",
    title: "Payroll Engine",
    desc: "Automated payroll processing with built-in tax compliance.",
  },
  {
    icon: "🤖",
    title: "AI Insights",
    desc: "Predictive analytics and intelligent core HR recommendations.",
  },
];

const Homepage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const openDrawer = () => {
    setDrawerOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#020817] flex font-sans text-slate-300">
      <div className="flex-1 p-6 sm:p-8 lg:p-12 overflow-y-auto border-r border-slate-800/40 bg-linear-to-br from-[#020817] via-[#020817] to-orange-950/10">
        <div className="flex items-center justify-between mb-10 lg:mb-16">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-linear-to-br from-orange-500 to-orange-600 flex items-center justify-center text-lg shadow-lg shadow-orange-500/30 animate-pulse">
              ⚡
            </div>
            <div>
              <div className="font-syne font-extrabold text-lg sm:text-xl text-slate-100 tracking-tight">NexusHR</div>
              <div className="text-[10px] text-slate-500 tracking-widest uppercase font-bold hidden sm:block">Enterprise Platform</div>
            </div>
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => openDrawer()}
              className="flex items-center gap-1.5 text-sm text-white font-semibold px-4 py-1.5 rounded-lg bg-linear-to-r from-orange-500 to-orange-600 shadow-md shadow-orange-500/20"
              aria-label="Open sign in">
              Sign In
            </button>
          </div>
        </div>

        {/* Hero */}
        <div className="mb-8 sm:mb-10 max-w-xl">
          <h1 className="font-syne font-extrabold text-3xl sm:text-4xl md:text-5xl text-slate-100 tracking-tight leading-tight mb-4">
            The Modern HR Platform <br className="hidden sm:block" />
            <span className="bg-linear-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">Built for Scale</span>
          </h1>
          <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
            NexusHR unifies people management, payroll, smart attendance tracking, and predictive workforce analytics into one enterprise dashboard.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-2xl">
          {features.map((feat) => (
            <div
              key={feat.title}
              className="p-4 sm:p-5 bg-slate-900/40 border border-slate-800/60 rounded-xl hover:border-orange-500/30 hover:-translate-y-0.5 transition-all duration-300">
              <div className="text-xl sm:text-2xl mb-2">{feat.icon}</div>
              <h3 className="font-syne font-bold text-xs sm:text-sm text-slate-200 mb-1">{feat.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats strip */}
        <div className="mt-10 flex flex-wrap gap-6 sm:gap-10">
          {[
            { value: "50K+", label: "Employees managed" },
            { value: "99.9%", label: "Uptime SLA" },
            { value: "180+", label: "Countries supported" },
          ].map(({ value, label }) => (
            <div key={label}>
              <div className="font-syne font-extrabold text-xl sm:text-2xl text-orange-400">{value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT PANEL: Auth Card (desktop only) ────────────────────────── */}
      <div className="w-105 hidden lg:flex flex-col justify-center p-12 bg-linear-to-b from-slate-950 to-[#020817] relative overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute top-1/4 -right-16 w-56 h-56 rounded-full bg-orange-500/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -left-16 w-40 h-40 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />

        {/* Form card */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-8 backdrop-blur-md shadow-2xl shadow-black/40">
          <SignInForm />
        </div>
      </div>

      <div
        className={`fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer panel - slides up from bottom on mobile */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Authentication"
        className={`fixed bottom-0 left-0 right-0 z-50 lg:hidden
                    bg-linear-to-b from-slate-950 to-[#020817]
                    border-t border-slate-800/60 rounded-t-3xl
                    px-5 pt-4 pb-8
                    transition-transform duration-300 ease-out
                    max-h-[92dvh] overflow-y-auto
                    ${drawerOpen ? "translate-y-0" : "translate-y-full"}`}>
        {/* Drag handle */}
        <div className="w-10 h-1 rounded-full bg-slate-700 mx-auto mb-5" />

        {/* Form */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md shadow-2xl shadow-black/40">
          <SignInForm />
        </div>
      </div>
    </div>
  );
};

export default Homepage;

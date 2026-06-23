import { useState } from "react";

interface SignUpProps {
  onSwitch: () => void;
}

type SignUpData = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
};

const ROLES = [
  { value: "hr_manager", label: "HR Manager" },
  { value: "employee", label: "Employee" },
  { value: "admin", label: "Administrator" },
  { value: "recruiter", label: "Recruiter" },
] as const;

const getPasswordStrength = (pw: string) => {
  if (!pw) return 0;
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return Math.min(score, 3);
};

const strengthConfig = {
  0: { label: "", color: "" },
  1: { label: "Weak", color: "bg-red-500" },
  2: { label: "Medium", color: "bg-amber-500" },
  3: { label: "Strong", color: "bg-green-500" },
} as const;

export default function SignUpForm({ onSwitch }: SignUpProps) {
  const [data, setData] = useState<SignUpData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [localError, setLocalError] = useState("");

  const strength = getPasswordStrength(data.password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");

    if (
      !data.fullName ||
      !data.email ||
      !data.password ||
      !data.confirmPassword
    ) {
      setLocalError("Please fill in all required fields.");
      return;
    }
    if (data.password !== data.confirmPassword) {
      setLocalError("Passwords do not match.");
      return;
    }
    if (data.password.length < 8) {
      setLocalError("Password must be at least 8 characters.");
      return;
    }
  };

  const set =
    (field: keyof SignUpData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setLocalError("");
      setData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* Header */}
      <div>
        <h2 className="font-syne text-2xl font-bold text-slate-100 tracking-tight">
          Create account
        </h2>
        <p className="text-sm text-slate-500 mt-1">Join your team on NexusHR</p>
      </div>

      <div className="space-y-3.5">
        {/* Full Name */}
        <div>
          <label
            htmlFor="signup-name"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1"
          >
            Full Name <span className="text-orange-500">*</span>
          </label>
          <input
            id="signup-name"
            type="text"
            value={data.fullName}
            onChange={set("fullName")}
            placeholder="Jane Doe"
            autoComplete="name"
            className="w-full px-4 py-2 bg-slate-900/60 border border-slate-700/50 rounded-lg
                       text-slate-100 text-sm placeholder:text-slate-600
                       outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10
                       transition-all"
            required
          />
        </div>

        {/* Work Email */}
        <div>
          <label
            htmlFor="signup-email"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1"
          >
            Work Email <span className="text-orange-500">*</span>
          </label>
          <input
            id="signup-email"
            type="email"
            value={data.email}
            onChange={set("email")}
            placeholder="you@company.com"
            autoComplete="email"
            className="w-full px-4 py-2 bg-slate-900/60 border border-slate-700/50 rounded-lg
                       text-slate-100 text-sm placeholder:text-slate-600
                       outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10
                       transition-all"
            required
          />
        </div>

        {/* Role */}
        <div>
          <label
            htmlFor="signup-role"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1"
          >
            Role
          </label>
          <select
            id="signup-role"
            value={data.role}
            onChange={set("role")}
            className="w-full px-4 py-2 bg-slate-900 border border-slate-700/50 rounded-lg
                       text-slate-100 text-sm outline-none cursor-pointer
                       focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
          >
            <option value="">Select your role</option>
            {ROLES.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="signup-password"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1"
          >
            Password <span className="text-orange-500">*</span>
          </label>
          <div className="relative">
            <input
              id="signup-password"
              type={showPassword ? "text" : "password"}
              value={data.password}
              onChange={set("password")}
              placeholder="Min. 8 characters"
              autoComplete="new-password"
              className="w-full px-4 py-2 pr-11 bg-slate-900/60 border border-slate-700/50 rounded-lg
                         text-slate-100 text-sm placeholder:text-slate-600
                         outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10
                         transition-all"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <EyeIcon open={showPassword} />
            </button>
          </div>

          {/* Strength meter */}
          {data.password.length > 0 && (
            <div className="mt-2 space-y-1">
              <div
                className="flex gap-1"
                role="progressbar"
                aria-valuenow={strength}
                aria-valuemax={3}
              >
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-sm transition-colors duration-300 ${
                      i <= strength
                        ? strengthConfig[strength as 1 | 2 | 3].color
                        : "bg-slate-800"
                    }`}
                  />
                ))}
              </div>
              {strength > 0 && (
                <span
                  className={`text-[11px] ${
                    strength === 1
                      ? "text-red-400"
                      : strength === 2
                        ? "text-amber-400"
                        : "text-green-400"
                  }`}
                >
                  {strengthConfig[strength as 1 | 2 | 3].label} password
                </span>
              )}
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="signup-confirm"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1"
          >
            Confirm Password <span className="text-orange-500">*</span>
          </label>
          <div className="relative">
            <input
              id="signup-confirm"
              type={showConfirm ? "text" : "password"}
              value={data.confirmPassword}
              onChange={set("confirmPassword")}
              placeholder="Re-enter password"
              autoComplete="new-password"
              className={`w-full px-4 py-2 pr-11 bg-slate-900/60 border rounded-lg
                          text-slate-100 text-sm placeholder:text-slate-600
                          outline-none focus:ring-4 transition-all
                          ${
                            data.confirmPassword &&
                            data.password !== data.confirmPassword
                              ? "border-red-500/60 focus:border-red-500 focus:ring-red-500/10"
                              : "border-slate-700/50 focus:border-orange-500 focus:ring-orange-500/10"
                          }`}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirm((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
              tabIndex={-1}
              aria-label={showConfirm ? "Hide password" : "Show password"}
            >
              <EyeIcon open={showConfirm} />
            </button>
          </div>
          {data.confirmPassword && data.password !== data.confirmPassword && (
            <p className="text-[11px] text-red-400 mt-1">
              Passwords do not match
            </p>
          )}
        </div>
      </div>

      {/* Local validation feedback strip */}
      {localError && (
        <div
          role="alert"
          className="p-3 rounded-lg text-sm border bg-red-500/10 text-red-400 border-red-500/30"
        >
          ⚠ {localError}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        className="w-full py-2.5 bg-gradient-to-r from-orange-500 to-orange-600
                   text-white font-bold rounded-lg text-sm tracking-wide
                   shadow-lg shadow-orange-500/20
                   hover:-translate-y-0.5 active:translate-y-0
                   transition-all duration-200 flex items-center justify-center gap-2"
      >
        Get Started →
      </button>

      {/* Switch Form Trigger */}
      <div className="text-center text-sm text-slate-500">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="text-orange-500 font-semibold hover:underline focus:outline-none focus:underline"
        >
          Sign in
        </button>
      </div>
    </form>
  );
}

// ─── Eye Icon Component ──────────────────────────────────────────────────────
function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
      />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    </svg>
  );
}

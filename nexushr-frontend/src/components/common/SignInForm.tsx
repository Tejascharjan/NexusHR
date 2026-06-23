import { signin } from "@/state/authSlice";
import { useAppDispatch } from "@/state/store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface SignInProps {
  onSwitch: () => void;
}

export default function SignInForm({ onSwitch }: SignInProps) {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    dispatch(signin({ loginRequest: { email, password }, navigate }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Header */}
      <div>
        <h2 className="font-syne text-2xl font-bold text-slate-100 tracking-tight">
          Welcome back
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Sign in to your NexusHR workspace
        </p>
      </div>

      {/* Fields */}
      <div className="space-y-4">
        {/* Email */}
        <div>
          <label
            htmlFor="signin-email"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5"
          >
            Email address <span className="text-orange-500">*</span>
          </label>
          <input
            id="signin-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            autoComplete="email"
            className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-700/50 rounded-lg
                       text-slate-100 text-sm placeholder:text-slate-600
                       outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10
                       transition-all"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="signin-password"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5"
          >
            Password <span className="text-orange-500">*</span>
          </label>
          <div className="relative">
            <input
              id="signin-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              className="w-full px-4 py-2.5 pr-11 bg-slate-900/60 border border-slate-700/50 rounded-lg
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
              {showPassword ? (
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
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Forgot password */}
      <div className="text-right -mt-1">
        <button
          type="button"
          className="text-xs text-orange-500 hover:underline focus:outline-none focus:underline"
        >
          Forgot password?
        </button>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={!email || !password}
        className="w-full py-2.5 bg-linear-to-r from-orange-500 to-orange-600
                   disabled:opacity-50 disabled:cursor-not-allowed
                   text-white font-bold rounded-lg text-sm tracking-wide
                   shadow-lg shadow-orange-500/20
                   hover:enabled:-translate-y-0.5 active:enabled:translate-y-0
                   transition-all duration-200 flex items-center justify-center gap-2"
      >
        Sign In →
      </button>

      {/* Switch Form Trigger */}
      <div className="text-center text-sm text-slate-500">
        Don&apos;t have an account?{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="text-orange-500 font-semibold hover:underline focus:outline-none focus:underline"
        >
          Create account
        </button>
      </div>
    </form>
  );
}

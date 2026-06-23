import { type SelectHTMLAttributes, forwardRef, type ReactNode } from "react";

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  children: ReactNode;
}

const SelectField = forwardRef<HTMLSelectElement, Props>(
  ({ label, error, children, className = "", ...props }, ref) => {
    return (
      <div>
        <label className="block text-sm text-slate-300 mb-2">{label}</label>

        <select
          ref={ref}
          {...props}
          className={`
          w-full
          bg-[#020817]
          border
          rounded-xl
          px-4
          py-2.5
          text-white
          outline-none
          transition-all
          ${
            error
              ? "border-red-500"
              : "border-slate-700 focus:border-orange-500"
          }
          ${className}
        `}
        >
          {children}
        </select>

        {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
      </div>
    );
  },
);

SelectField.displayName = "SelectField";

export default SelectField;

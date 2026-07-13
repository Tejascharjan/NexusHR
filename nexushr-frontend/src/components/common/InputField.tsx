import { type InputHTMLAttributes, forwardRef } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const InputField = forwardRef<HTMLInputElement, Props>(({ label, error, ...props }, ref) => {
  return (
    <div>
      <label className="block text-sm text-slate-300 mb-2">{label}</label>

      <input
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
            ${error ? "border-red-500" : "border-slate-700 focus:border-orange-500"}
          `}
      />

      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
});

InputField.displayName = "InputField";

export default InputField;

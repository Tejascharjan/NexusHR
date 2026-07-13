import React from "react";
import { Textarea } from "@/components/ui/textarea";

interface TextAreaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

const TextAreaField = React.forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(({ label, error, className = "", ...props }, ref) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-300">{label}</label>

      <Textarea
        ref={ref}
        className={`bg-[#020817] border rounded-xl border-slate-700 text-white placeholder:text-slate-500 focus:ring-orange-500 resize-none ${className}`}
        {...props}
      />

      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
});

TextAreaField.displayName = "TextAreaField";

export default TextAreaField;

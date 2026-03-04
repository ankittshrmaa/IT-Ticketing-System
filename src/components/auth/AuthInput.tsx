"use client";

import { useState, type InputHTMLAttributes } from "react";

type AuthInputProps = {
  label: string;
  name: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function AuthInput({ label, name, type = "text", ...rest }: AuthInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <label className="flex flex-col gap-1 text-sm text-slate-200">
      <span>{label}</span>
      <div className="relative">
        <input
          name={name}
          type={inputType}
          className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-50 outline-none ring-offset-0 transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/60 pr-16"
          {...rest}
        />
        {isPassword ? (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-2 flex items-center text-[11px] font-medium text-slate-400 hover:text-slate-200"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        ) : null}
      </div>
    </label>
  );
}


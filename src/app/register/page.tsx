"use client";

import { FormEvent, useState } from "react";
import { AuthCard } from "@/components/auth/AuthCard";
import { AuthInput } from "@/components/auth/AuthInput";
import { OAuthButtons } from "@/components/auth/OAuthButtons";
import { AuthFormFooter } from "@/components/auth/AuthFormFooter";
import { register } from "@/lib/authClient";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [otpSent, setOtpSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const password = formData.get("password")?.toString() ?? "";
    const confirmPassword =
      formData.get("confirmPassword")?.toString() ?? "";

    if (password !== confirmPassword) {
      setLoading(false);
      setError("Passwords do not match.");
      return;
    }

    const payload = {
      name: formData.get("name")?.toString() ?? null,
      email: formData.get("email")?.toString() ?? null,
      password,
      // You can also store department later in MongoDB:
      // department: formData.get("department")?.toString() ?? null,
    };

    register(payload)
      .catch((error) => {
        console.error("Register error", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSendOtp = () => {
    // TODO: call backend to send OTP to the given email.
    setOtpSent(true);
    setEmailVerified(false);
  };

  const handleVerifyOtp = () => {
    // TODO: call backend to verify OTP.
    setEmailVerified(true);
  };

  return (
    <AuthCard
      title="Create account"
      subtitle="Sign up with your details or use Google / GitHub."
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <AuthInput
          label="Name"
          name="name"
          placeholder="Your name"
          autoComplete="name"
          required
        />
        <AuthInput
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
        />
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <button
            type="button"
            onClick={handleSendOtp}
            className="inline-flex items-center rounded-md border border-sky-600 bg-sky-900/40 px-2.5 py-1 font-medium text-sky-200 hover:bg-sky-800/70"
          >
            {otpSent ? "Resend OTP" : "Send OTP"}
          </button>
          {emailVerified ? (
            <span className="text-emerald-400">Email verified</span>
          ) : otpSent ? (
            <span>OTP sent to your email</span>
          ) : null}
        </div>
        {otpSent ? (
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <AuthInput
                label="Enter OTP"
                name="otp"
                placeholder="6-digit code"
                maxLength={6}
              />
            </div>
            <button
              type="button"
              onClick={handleVerifyOtp}
              className="mb-0.5 inline-flex h-9 items-center justify-center rounded-md bg-emerald-500 px-3 text-xs font-medium text-white hover:bg-emerald-400"
            >
              Verify
            </button>
          </div>
        ) : null}
        <label className="flex flex-col gap-1 text-sm text-slate-200">
          <span>Department</span>
          <select
            name="department"
            className="rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-50 outline-none ring-offset-0 transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/60"
            defaultValue="IT"
          >
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Accounts">Accounts</option>
            <option value="Sales">Sales</option>
            <option value="Admin">Admin</option>
            <option value="Product">Product</option>
            <option value="Marketing">Marketing</option>
            <option value="CS">CS</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <AuthInput
          label="Password"
          name="password"
          type="password"
          placeholder="Create a strong password"
          autoComplete="new-password"
          required
        />
        <AuthInput
          label="Confirm password"
          name="confirmPassword"
          type="password"
          placeholder="Repeat your password"
          autoComplete="new-password"
          required
        />

        {error ? (
          <p className="text-xs text-red-400" role="alert">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 inline-flex h-10 items-center justify-center rounded-lg bg-sky-500 px-4 text-sm font-medium text-white transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>

      <OAuthButtons
        onGoogle={() => console.log("Google register clicked")}
        onGitHub={() => console.log("GitHub register clicked")}
      />

      <AuthFormFooter mode="register" />
    </AuthCard>
  );
}


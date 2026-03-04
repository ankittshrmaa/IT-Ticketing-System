"use client";

import { FormEvent, useState } from "react";
import { AuthCard } from "@/components/auth/AuthCard";
import { AuthInput } from "@/components/auth/AuthInput";
import { OAuthButtons } from "@/components/auth/OAuthButtons";
import { AuthFormFooter } from "@/components/auth/AuthFormFooter";
import { login } from "@/lib/authClient";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: formData.get("name")?.toString() ?? null,
      email: formData.get("email")?.toString() ?? null,
      password: formData.get("password")?.toString() ?? null,
    };

    login(payload)
      .catch((error) => {
        console.error("Login error", error);
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
      title="Login"
      subtitle="Sign in with your details or use Google / GitHub."
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <AuthInput
          label="Name"
          name="name"
          placeholder="Your name"
          autoComplete="name"
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
        <AuthInput
          label="Password"
          name="password"
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="mt-2 inline-flex h-10 items-center justify-center rounded-lg bg-sky-500 px-4 text-sm font-medium text-white transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <OAuthButtons
        onGoogle={() => console.log("Google login clicked")}
        onGitHub={() => console.log("GitHub login clicked")}
      />

      <AuthFormFooter mode="login" />
    </AuthCard>
  );
}


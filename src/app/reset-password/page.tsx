"use client";

import { FormEvent, useState } from "react";
import { AuthCard } from "@/components/auth/AuthCard";
import { AuthInput } from "@/components/auth/AuthInput";
import { AuthFormFooter } from "@/components/auth/AuthFormFooter";
import { requestPasswordReset } from "@/lib/authClient";

export default function ResetPasswordPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const payload = {
      email: formData.get("email")?.toString() ?? "",
    };

    requestPasswordReset(payload.email)
      .catch((error) => {
        console.error("Reset password error", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <AuthCard
      title="Reset password"
      subtitle="Enter your email to receive reset instructions."
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <AuthInput
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="mt-2 inline-flex h-10 items-center justify-center rounded-lg bg-sky-500 px-4 text-sm font-medium text-white transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Sending link..." : "Send reset link"}
        </button>
      </form>

      <AuthFormFooter mode="reset" />
    </AuthCard>
  );
}


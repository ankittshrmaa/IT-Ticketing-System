import Link from "next/link";

type AuthFormFooterProps = {
  mode: "login" | "register" | "reset";
};

export function AuthFormFooter({ mode }: AuthFormFooterProps) {
  if (mode === "login") {
    return (
      <p className="mt-4 text-center text-xs text-slate-500">
        New here?{" "}
        <Link
          href="/register"
          className="font-medium text-sky-400 hover:text-sky-300"
        >
          Create an account
        </Link>{" "}
        or{" "}
        <Link
          href="/reset-password"
          className="font-medium text-sky-400 hover:text-sky-300"
        >
          reset password
        </Link>
        .
      </p>
    );
  }

  if (mode === "register") {
    return (
      <p className="mt-4 text-center text-xs text-slate-500">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-sky-400 hover:text-sky-300"
        >
          Log in
        </Link>
        .
      </p>
    );
  }

  return (
    <p className="mt-4 text-center text-xs text-slate-500">
      Remembered your password?{" "}
      <Link
        href="/login"
        className="font-medium text-sky-400 hover:text-sky-300"
      >
        Back to login
      </Link>
      .
    </p>
  );
}


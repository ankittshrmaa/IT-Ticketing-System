import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/70 p-8 shadow-xl shadow-black/40 backdrop-blur">
      <h1 className="mb-2 text-center text-2xl font-semibold text-slate-50">
        Welcome
      </h1>
      <p className="mb-6 text-center text-sm text-slate-400">
        Use the navigation to go to Login, Create Account, or Reset Password
        pages.
      </p>

      <div className="flex flex-col gap-3">
        <Link
          href="/login"
          className="inline-flex h-10 items-center justify-center rounded-lg bg-sky-500 px-4 text-sm font-medium text-white transition hover:bg-sky-400"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="inline-flex h-10 items-center justify-center rounded-lg border border-white/15 bg-slate-900/40 px-4 text-sm font-medium text-slate-50 transition hover:bg-slate-800/60"
        >
          Create account
        </Link>
      </div>
    </main>
  );
}

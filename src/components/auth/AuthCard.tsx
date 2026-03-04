type AuthCardProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export function AuthCard({ title, subtitle, children }: AuthCardProps) {
  return (
    <section className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/80 p-8 shadow-xl shadow-black/40 backdrop-blur">
      <header className="mb-6 text-center">
        <h1 className="text-2xl font-semibold text-slate-50">{title}</h1>
        {subtitle ? (
          <p className="mt-1 text-sm text-slate-400">{subtitle}</p>
        ) : null}
      </header>
      {children}
    </section>
  );
}


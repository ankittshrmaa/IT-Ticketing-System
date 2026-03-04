type OAuthButtonsProps = {
  onGoogle?: () => void;
  onGitHub?: () => void;
};

export function OAuthButtons({ onGoogle, onGitHub }: OAuthButtonsProps) {
  return (
    <div className="mt-4 flex flex-col gap-2">
      <button
        type="button"
        onClick={onGoogle}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white text-slate-900 px-3 py-2 text-sm font-medium transition hover:bg-slate-100"
      >
        <span className="text-lg">G</span>
        <span>Continue with Google</span>
      </button>
      <button
        type="button"
        onClick={onGitHub}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-800 px-3 py-2 text-sm font-medium text-slate-50 transition hover:bg-slate-700"
      >
        <span className="text-lg">GH</span>
        <span>Continue with GitHub</span>
      </button>
    </div>
  );
}


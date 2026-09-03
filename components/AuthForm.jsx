"use client";

export function AuthInput(props) {
  return (
    <input
      {...props}
      className="w-full h-11 px-3 rounded-sm border border-hairline-soft text-sm text-ink outline-none focus:border-primary"
    />
  );
}

export function AuthButton({ children, ...props }) {
  return (
    <button
      {...props}
      className="w-full h-11 rounded-full bg-primary text-canvas font-semibold text-sm disabled:opacity-60"
    >
      {children}
    </button>
  );
}

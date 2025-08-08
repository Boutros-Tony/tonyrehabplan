import React from "react";

export function Panel(props: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={
        "rounded-xl border border-gray-200 bg-white p-4 shadow-sm " +
        (props.className ?? "")
      }
    >
      {props.children}
    </div>
  );
}

export function Tag(props: React.PropsWithChildren) {
  return (
    <span className="text-xs text-gray-600 border border-gray-200 rounded-full px-2 py-0.5 bg-gray-50">
      {props.children}
    </span>
  );
}

export function Pill(
  props: React.PropsWithChildren<{ tone?: "good" | "warn" | "bad" }>
) {
  const base = "text-xs rounded-full px-2 py-0.5 border ";
  const toneClass =
    props.tone === "good"
      ? "bg-green-50 text-green-700 border-green-200"
      : props.tone === "bad"
      ? "bg-red-50 text-red-700 border-red-200"
      : "bg-yellow-50 text-yellow-700 border-yellow-200";
  return <span className={base + toneClass}>{props.children}</span>;
}

export function Button(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "ghost" | "warn" | "bad";
  }
) {
  const { variant = "primary", className = "", ...rest } = props;
  const base =
    "inline-flex items-center justify-center rounded-lg border px-3 py-2 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed ";
  const styles = {
    primary:
      "bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-500 hover:-translate-y-0.5 hover:shadow-sm",
    ghost: "bg-white border-gray-200 text-gray-700 hover:bg-gray-50",
    warn: "bg-amber-600 text-white border-amber-600 hover:bg-amber-500",
    bad: "bg-red-600 text-white border-red-600 hover:bg-red-500",
  } as const;
  return (
    <button className={base + styles[variant] + " " + className} {...rest} />
  );
}

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { label?: string }
>((props, ref) => {
  const { label, className = "", ...rest } = props;
  return (
    <label className="text-sm text-gray-700 space-y-1">
      {label && <div>{label}</div>}
      <input
        ref={ref}
        className={
          "bg-white text-gray-900 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300 w-full " +
          className
        }
        {...rest}
      />
    </label>
  );
});
Input.displayName = "Input";

export function Select(
  props: React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string }
) {
  const { label, className = "", children, ...rest } = props;
  return (
    <label className="text-sm text-gray-700 space-y-1">
      {label && <div>{label}</div>}
      <select
        className={
          "bg-white text-gray-900 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300 w-full " +
          className
        }
        {...rest}
      >
        {children}
      </select>
    </label>
  );
}

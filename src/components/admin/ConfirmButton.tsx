"use client";

import type { ReactNode } from "react";

/**
 * A submit button that asks for confirmation before firing its form's action.
 * Used for destructive actions (delete) in the admin dashboard.
 */
export function ConfirmButton({
  children,
  message = "Are you sure? This cannot be undone.",
  className = "",
}: {
  children: ReactNode;
  message?: string;
  className?: string;
}) {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!confirm(message)) e.preventDefault();
      }}
      className={className}
    >
      {children}
    </button>
  );
}

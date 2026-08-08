"use client";

import { useEffect } from "react";
import { PRODUCT_NAME } from "@/lib/nav";

export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f7f5f1",
          color: "#1a2332",
          fontFamily: "system-ui, sans-serif",
          padding: "1.5rem",
        }}
      >
        <div style={{ maxWidth: "28rem", textAlign: "center" }}>
          <p style={{ fontSize: "1.25rem", fontWeight: 600, color: "#0b1f3a" }}>
            {PRODUCT_NAME}
          </p>
          <h1
            style={{
              marginTop: "1rem",
              fontSize: "1.5rem",
              fontWeight: 600,
              color: "#0b1f3a",
            }}
          >
            Something paused for a moment
          </h1>
          <p style={{ marginTop: "0.75rem", color: "#5c6573", lineHeight: 1.5 }}>
            We hit an unexpected snag. You can try again — your shared space is
            still here.
          </p>
          <button
            type="button"
            onClick={() => retry()}
            style={{
              marginTop: "1.5rem",
              border: "none",
              borderRadius: "0.375rem",
              background: "#0b1f3a",
              color: "#fff",
              padding: "0.625rem 1rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}

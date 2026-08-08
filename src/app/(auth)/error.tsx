"use client";

import { useEffect } from "react";
import { ErrorMessage } from "@/components/ui-states";

export default function AuthError({
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
    <div className="flex flex-1 items-center justify-center px-6 py-12">
      <ErrorMessage
        title="We couldn't open this screen just now"
        description="Take a breath and try again when you're ready. Our Ledger will be here."
        onRetry={retry}
        homeHref="/login"
        homeLabel="Back to login"
      />
    </div>
  );
}

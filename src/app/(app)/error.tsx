"use client";

import { useEffect } from "react";
import { ErrorMessage } from "@/components/ui-states";

export default function AppError({
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
    <ErrorMessage
      title="Something paused for a moment"
      description="We hit a small snag loading this page. You can try again — nothing is lost from Our Money Room."
      onRetry={retry}
    />
  );
}

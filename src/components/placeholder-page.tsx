import { EmptyState } from "@/components/ui-states";

/** Soft placeholder for sections that are not built out yet. */
export function PlaceholderPage({
  title,
  description = "This corner of Our Money Room is ready when you are. Nothing to manage here yet.",
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <h1 className="text-2xl font-semibold tracking-tight text-navy sm:text-3xl">
        {title}
      </h1>
      <div className="mt-6">
        <EmptyState title="Coming soon" description={description} />
      </div>
    </div>
  );
}

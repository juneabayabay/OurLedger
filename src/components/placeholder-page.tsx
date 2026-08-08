export function PlaceholderPage({
  title,
  description = "This section is ready for content. Nothing here yet.",
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <h1 className="text-2xl font-semibold tracking-tight text-navy sm:text-3xl">
        {title}
      </h1>
      <p className="mt-2 text-base text-muted">{description}</p>
    </div>
  );
}

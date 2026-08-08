import { LoadingState } from "@/components/ui-states";

export default function AuthLoading() {
  return (
    <div className="flex flex-1 items-center justify-center px-6 py-12">
      <LoadingState label="Preparing a calm welcome…" />
    </div>
  );
}

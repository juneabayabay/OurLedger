import { redirect } from "next/navigation";

/** Signup is disabled — one shared household login only. */
export default function SignupPage() {
  redirect("/login");
}

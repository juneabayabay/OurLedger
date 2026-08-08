import { AuthBrand } from "@/components/auth-brand";
import { LoginForm } from "@/components/auth-forms";

export default function LoginPage() {
  return (
    <AuthBrand title="Welcome back">
      <LoginForm />
    </AuthBrand>
  );
}

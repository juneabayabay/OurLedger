/**
 * Public Supabase env only — never read a service-role key here.
 */
export function getSupabasePublicEnv(): {
  url: string | undefined;
  key: string | undefined;
  isConfigured: boolean;
} {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  return {
    url,
    key,
    isConfigured: Boolean(url && key),
  };
}

export function requireSupabasePublicEnv(): { url: string; key: string } {
  const { url, key, isConfigured } = getSupabasePublicEnv();
  if (!isConfigured || !url || !key) {
    throw new Error(
      "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY to .env.local.",
    );
  }
  return { url, key };
}

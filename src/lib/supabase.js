import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey);

// Client-side app (Vite SPA, no server) — only the public anon key is ever
// used here. Write access is granted exclusively to authenticated admin
// users via Row Level Security policies defined in supabase/schema.sql,
// never by a secret key (there is no safe place to keep one in a browser
// bundle).
export const supabase = isSupabaseConfigured
  ? createClient(url, anonKey)
  : null;

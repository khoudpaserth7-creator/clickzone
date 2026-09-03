import { createClient } from "@supabase/supabase-js";

// SERVER-ONLY. Do not import this file from any "use client" component —
// it uses the service_role key, which bypasses Row Level Security
// entirely. It must only ever run in API routes / server components.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabaseAdmin =
  supabaseUrl && serviceRoleKey ? createClient(supabaseUrl, serviceRoleKey) : null;

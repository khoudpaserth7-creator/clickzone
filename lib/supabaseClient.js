import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// NOTE: only the anon/publishable key belongs here. Never put the
// service_role / secret key in any file under this project — it must
// only ever be used in a trusted server environment, and never shipped
// to the browser.
export const supabase =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

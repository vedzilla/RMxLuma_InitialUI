import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl) {
  throw new Error('Missing environment variable: PUBLIC_SUPABASE_URL');
}
if (!supabaseKey) {
  throw new Error('Missing environment variable: PUBLIC_SUPABASE_PUBLISHABLE_KEY');
}

// Singleton client — safe to reuse across server component invocations.
let _client: SupabaseClient | null = null;

export function getClient(): SupabaseClient {
  if (!_client) {
    _client = createClient(supabaseUrl!, supabaseKey!);
  }
  return _client;
}

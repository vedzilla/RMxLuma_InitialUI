import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ajwfegvmvmcddapigswd.supabase.co';
const supabaseKey = 'sb_publishable_bytnAdiOEBVulOAT6wJjzA_LFDQN2xN';

// Singleton client — safe to reuse across server component invocations.
let _client: SupabaseClient | null = null;

export function getClient(): SupabaseClient {
  if (!_client) {
    _client = createClient(supabaseUrl!, supabaseKey!);
  }
  return _client;
}

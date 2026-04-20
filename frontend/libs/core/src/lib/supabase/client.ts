import { InjectionToken } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

export interface SupabaseConfig {
  supabaseUrl: string;
  supabaseAnonKey: string;
}

export const SUPABASE_CONFIG = new InjectionToken<SupabaseConfig>("SUPABASE_CONFIG");
export const SUPABASE_CLIENT = new InjectionToken<SupabaseClient>("SUPABASE_CLIENT");

export function supabaseClientFactory(config: SupabaseConfig): SupabaseClient {
  return createClient(config.supabaseUrl, config.supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false,
    },
  });
}
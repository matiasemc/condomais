import { InjectionToken } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

export interface SupabaseConfig {
  supabaseUrl: string;
  supabaseAnonKey: string;
}

export const SUPABASE_CONFIG = new InjectionToken<SupabaseConfig>("SUPABASE_CONFIG");
export const SUPABASE_CLIENT = new InjectionToken<SupabaseClient>("SUPABASE_CLIENT");

const lockQueue = new Map<string, Promise<void>>();

async function withInAppLock<R>(name: string, _acquireTimeout: number, fn: () => Promise<R>): Promise<R> {
  const previous = lockQueue.get(name) ?? Promise.resolve();
  let release!: () => void;
  const current = new Promise<void>((resolve) => {
    release = resolve;
  });

  lockQueue.set(name, previous.finally(() => current));

  await previous;

  try {
    return await fn();
  } finally {
    release();

    if (lockQueue.get(name) === current) {
      lockQueue.delete(name);
    }
  }
}

export function supabaseClientFactory(config: SupabaseConfig): SupabaseClient {
  return createClient(config.supabaseUrl, config.supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      // Avoid Web Locks API timeout noise while keeping auth work serialized in this app instance.
      lock: withInAppLock,
    },
  });
}

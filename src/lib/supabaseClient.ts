import { createClient } from '@supabase/supabase-js'
import type { SupabaseClient } from '@supabase/supabase-js'

// Read env vars without forcing types to avoid throwing when undefined
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Graceful fallback: if env vars are missing, export a typed stub client
// so the app can run without crashing. Pages should handle the error.
interface StubSupabaseClient {
  functions: {
    invoke: <T = unknown>(
      name: string,
      options?: unknown
    ) => Promise<{ data: T | null; error: Error }>
  }
}

let supabase: SupabaseClient | StubSupabaseClient

if (typeof supabaseUrl === 'string' && supabaseUrl && typeof supabaseAnonKey === 'string' && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
} else {
  console.warn('[Supabase] VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is missing. Supabase client disabled.')
  // Minimal typed stub that mirrors the functions.invoke API shape used by the app
  supabase = {
    functions: {
      invoke: async () => ({ data: null, error: new Error('Supabase is not configured') })
    }
  }
}

export { supabase }
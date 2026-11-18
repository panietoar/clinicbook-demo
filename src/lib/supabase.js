import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(url, anonKey)

// Admin client so the dashboard can see every patient without login issues
export const supabaseAdmin = createClient(
  url,
  import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY
)

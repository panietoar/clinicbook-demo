import { supabase } from './supabase'

export async function getUser() {
  const { data } = await supabase.auth.getUser()
  return data.user
}

export function isAdmin(user) {
  return !!user && user.email.endsWith('@clinicbook.app')
}

// ============================================
// NHS Appointment Booking System
// Developed by TRM
// Auth Helper — imported by every protected page
// ============================================

import { supabase } from './supabase.js'

/**
 * Checks if user is logged in.
 * Redirects to login.html if not authenticated.
 * Returns the session if authenticated.
 */
export async function requireAuth() {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    window.location.href = 'login.html'
    return null
  }
  return session
}

/**
 * Returns the current logged-in user object or null.
 */
export async function getUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

/**
 * Logs the user out and redirects to home page.
 */
export async function logout() {
  await supabase.auth.signOut()
  window.location.href = 'index.html'
}

/**
 * Fetches user's full name from profiles_trm table
 * and sets it as the text of the element with the given ID.
 */
export async function showUserName(elementId) {
  const user = await getUser()
  if (!user) return

  const { data, error } = await supabase
    .from('profiles_trm')
    .select('full_name')
    .eq('id', user.id)
    .single()

  if (error) {
    console.error('Could not load user name:', error.message)
    return
  }

  const el = document.getElementById(elementId)
  if (el) el.textContent = 'Hello, ' + data.full_name
}
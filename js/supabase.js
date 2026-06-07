// ============================================
// NHS Appointment Booking System
// Developed by TRM
// Supabase Client — imported by every page
// ============================================

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

const SUPABASE_URL = 'https://ataqzfyppitexytlitsw.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0YXF6ZnlwcGl0ZXh5dGxpdHN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA3NjQzODEsImV4cCI6MjA5NjM0MDM4MX0.-aQr3ALpgV4AbKCeo9ftvmXQ7u5nBHqIT67o5NlSRGM'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

console.log('✅ Supabase client loaded — NHS Booking TRM')
import { createBrowserClient } from '@supabase/ssr'

// ⚠️ Sustituimos process.env por los valores directos
const supabaseUrl = 'https://wswkzuuljapxugaencif.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indzd2t6dXVsamFweHVnYWVuY2lmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxMDk4MjcsImV4cCI6MjA1ODY4NTgyN30.4zcBbugBSQhflUKGMRnTLK59JDo6bOwjUqolYxZT0pk'

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey)

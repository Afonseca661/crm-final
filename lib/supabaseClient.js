import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = 'https://wswkzuuljapxugaencif.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY

if (typeof window !== 'undefined' && !supabaseKey) {
  throw new Error('Falta NEXT_PUBLIC_SUPABASE_KEY en variables de entorno del navegador')
}

export const supabase = createBrowserClient(supabaseUrl, supabaseKey)

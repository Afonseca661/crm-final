// Este código asegura que Supabase solo se inicialice en el navegador
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wswkzuuljapxugaencif.supabase.co'
const supabaseKey = typeof window !== 'undefined' ? process.env.NEXT_PUBLIC_SUPABASE_KEY : null

export const supabase = createClient(supabaseUrl, supabaseKey)


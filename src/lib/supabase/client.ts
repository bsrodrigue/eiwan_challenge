import { createClient } from '@supabase/supabase-js';
const supaBaseUrl = process.env.REACT_APP_SUPABASE_URL || '';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supaBaseUrl, supabaseAnonKey);
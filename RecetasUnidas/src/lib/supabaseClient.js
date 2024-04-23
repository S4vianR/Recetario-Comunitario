// In your supabaseClient.js file
import { createClient } from '@supabase/supabase-js';

const SECRET_SUPABASE_KEY = import.meta.env.VITE_SECRET_SUPABASE_KEY;
const supabaseUrl = 'https://kaonlhtranrfojpknofp.supabase.co';

export const supabase = createClient(supabaseUrl, SECRET_SUPABASE_KEY);

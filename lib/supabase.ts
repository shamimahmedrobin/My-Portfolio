import { createClient } from '@supabase/supabase-js';

// These env variables should be added in .env.local
// Provide fallbacks to prevent crashes during development/preview if not set yet.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-url.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

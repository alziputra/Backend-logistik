const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
// Format baru Supabase: sb_publishable_* (menggantikan anon key)
const supabasePublishableKey = process.env.SUPABASE_PUBLISHABLE_KEY;
// Format baru Supabase: sb_secret_* (menggantikan service_role key)
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

if (!supabaseUrl || !supabasePublishableKey) {
  throw new Error('Missing Supabase environment variables: SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY are required');
}

// Public client (untuk operasi user, mengikuti RLS)
const supabase = createClient(supabaseUrl, supabasePublishableKey);

// Admin client (bypass RLS — hanya untuk server-side)
const supabaseAdmin = createClient(supabaseUrl, supabaseSecretKey);

module.exports = { supabase, supabaseAdmin };

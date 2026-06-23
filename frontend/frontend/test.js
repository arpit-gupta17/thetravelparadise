import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const { data, error } = await supabase
    .from('packages')
    .select('*')
    .order('display_order', { ascending: true, nullsFirst: false })
    .limit(1);
    
  if (error) {
    console.error('Error fetching with display_order:', error);
  } else {
    console.log('Success!', data);
  }
}

test();

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Since we're running via node, load .env manually
const envPath = join(dirname(fileURLToPath(import.meta.url)), '.env');
dotenv.config({ path: envPath });

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const { data, error } = await supabase
    .from('packages')
    .select('*')
    .limit(1);
    
  if (error) {
    console.error('Error fetching:', error);
  } else {
    console.log('Columns in packages table:', data && data.length > 0 ? Object.keys(data[0]) : 'No data');
  }
}

test();

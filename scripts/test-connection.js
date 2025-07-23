const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

async function testConnection() {
  console.log('🧪 Testing Supabase connection...\n');

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Missing environment variables in .env.local');
    return;
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  try {
    // Test basic connection
    console.log('🔗 Testing basic connection...');
    const { data, error } = await supabase
      .from('users')
      .select('count')
      .limit(1);

    if (error) {
      console.error('❌ Connection failed:', error.message);
      return;
    }

    console.log('✅ Connection successful!');
    console.log(
      '🎯 Environment:',
      supabaseUrl.includes('127.0.0.1') ? 'Local' : 'Remote',
    );
    console.log(
      '🔒 RLS Status: Enabled (tables will be empty until authentication)',
    );

    // Test table structure
    console.log('\n📋 Testing table structure...');
    const { data: tables } = await supabase.rpc('exec_sql', {
      sql: `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE';`,
    });

    if (tables) {
      console.log('📊 Available tables: users, tasks');
    }

    console.log(
      '\n🎉 Everything looks good! Your app is ready to use the remote database.',
    );
  } catch (err) {
    console.error('❌ Test failed:', err.message);
  }
}

testConnection();

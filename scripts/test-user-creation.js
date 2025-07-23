const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

async function testUserCreation() {
  console.log('🧪 Testing user creation with fixed RLS policies...\n');

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Missing environment variables');
    return;
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  try {
    // Test creating a user (this was failing before due to RLS)
    const testEmail = `test-${Date.now()}@example.com`;
    console.log(`📝 Attempting to create user: ${testEmail}`);

    const { data: newUser, error: createError } = await supabase
      .from('users')
      .insert([{ email: testEmail }])
      .select()
      .single();

    if (createError) {
      console.error('❌ User creation failed:', createError.message);
      return;
    }

    console.log('✅ User created successfully!', {
      id: newUser.id,
      email: newUser.email,
    });

    // Test reading the user back
    const { data: fetchedUser, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('email', testEmail)
      .single();

    if (fetchError) {
      console.error('❌ User fetch failed:', fetchError.message);
      return;
    }

    console.log('✅ User fetched successfully!', {
      id: fetchedUser.id,
      email: fetchedUser.email,
    });

    // Clean up test user
    const { error: deleteError } = await supabase
      .from('users')
      .delete()
      .eq('id', newUser.id);

    if (deleteError) {
      console.log('⚠️  Could not clean up test user:', deleteError.message);
    } else {
      console.log('🧹 Test user cleaned up');
    }

    console.log(
      '\n🎉 All user operations work correctly! The RLS policies are fixed.',
    );
  } catch (err) {
    console.error('❌ Test failed:', err.message);
  }
}

testUserCreation();

const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function testUserCreation() {
  console.log('🧪 Testing user creation with Neon Postgres...\n');

  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.error('❌ Missing DATABASE_URL environment variable');
    return;
  }

  // Create a connection pool
  const pool = new Pool({
    connectionString: databaseUrl,
    ssl: {
      rejectUnauthorized: false // Required for Neon Postgres
    }
  });

  try {
    // Test creating a user
    const testEmail = `test-${Date.now()}@example.com`;
    console.log(`📝 Attempting to create user: ${testEmail}`);

    const createResult = await pool.query(
      'INSERT INTO users (email) VALUES ($1) RETURNING *',
      [testEmail]
    );

    if (createResult.rows.length === 0) {
      console.error('❌ User creation failed');
      return;
    }

    const newUser = createResult.rows[0];
    console.log('✅ User created successfully!', {
      id: newUser.id,
      email: newUser.email,
    });

    // Test reading the user back
    const fetchResult = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [testEmail]
    );

    if (fetchResult.rows.length === 0) {
      console.error('❌ User fetch failed');
      return;
    }

    const fetchedUser = fetchResult.rows[0];
    console.log('✅ User fetched successfully!', {
      id: fetchedUser.id,
      email: fetchedUser.email,
    });

    // Clean up test user
    const deleteResult = await pool.query(
      'DELETE FROM users WHERE id = $1',
      [newUser.id]
    );

    if (deleteResult.rowCount === 0) {
      console.log('⚠️  Could not clean up test user');
    } else {
      console.log('🧹 Test user cleaned up');
    }

    console.log('\n🎉 All user operations work correctly with Neon Postgres!');
  } catch (err) {
    console.error('❌ Test failed:', err.message);
  } finally {
    // Close the pool
    await pool.end();
  }
}

testUserCreation();

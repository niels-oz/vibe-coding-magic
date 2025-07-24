const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function testConnection() {
  console.log('🧪 Testing Neon Postgres connection...\n');

  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.error('❌ Missing DATABASE_URL environment variable in .env.local');
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
    // Test basic connection
    console.log('🔗 Testing basic connection...');
    const { rows, rowCount } = await pool.query('SELECT COUNT(*) FROM users');

    console.log('✅ Connection successful!');
    console.log('👥 Users count:', rows[0].count);
    console.log('🎯 Environment:', databaseUrl.includes('localhost') ? 'Local' : 'Remote');

    // Test table structure
    console.log('\n📋 Testing table structure...');
    const { rows: tables } = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE';
    `);

    if (tables && tables.length > 0) {
      console.log('📊 Available tables:', tables.map(t => t.table_name).join(', '));
    } else {
      console.log('⚠️ No tables found in the database');
    }

    // Test database version
    const { rows: versionInfo } = await pool.query('SELECT version()');
    console.log('\n🔍 Database version:', versionInfo[0].version);

    console.log('\n🎉 Everything looks good! Your app is ready to use Neon Postgres.');
  } catch (err) {
    console.error('❌ Test failed:', err.message);
  } finally {
    // Close the pool
    await pool.end();
  }
}

testConnection();

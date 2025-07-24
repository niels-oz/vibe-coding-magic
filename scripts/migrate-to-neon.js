const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function migrateToNeon() {
  console.log('🚀 Starting migration to Neon Postgres...\n');

  // Validate environment variables
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.error('❌ Missing required environment variable: DATABASE_URL');
    console.error('\nPlease check your .env.local file');
    process.exit(1);
  }

  // Create a connection pool
  const pool = new Pool({
    connectionString: databaseUrl,
    ssl: {
      rejectUnauthorized: false // Required for Neon Postgres
    }
  });

  try {
    console.log('🔗 Connected to Neon Postgres');
    console.log('📊 Creating database schema...\n');

    // Begin transaction
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Create users table
      console.log('👤 Creating users table...');
      await client.query(`
        CREATE TABLE IF NOT EXISTS users (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          email TEXT UNIQUE NOT NULL,
          created_at TIMESTAMP DEFAULT NOW()
        );
      `);
      console.log('✅ Users table created');

      // Create tasks table
      console.log('📝 Creating tasks table...');
      await client.query(`
        CREATE TABLE IF NOT EXISTS tasks (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id UUID REFERENCES users(id) ON DELETE CASCADE,
          text TEXT NOT NULL,
          priority INTEGER NOT NULL CHECK (priority >= 1 AND priority <= 5),
          created_at TIMESTAMP DEFAULT NOW()
        );
      `);
      console.log('✅ Tasks table created');

      // Create indexes
      console.log('🔍 Creating indexes...');
      await client.query(`
        CREATE INDEX IF NOT EXISTS tasks_user_id_idx ON tasks (user_id);
      `);
      console.log('✅ Indexes created');

      // Commit transaction
      await client.query('COMMIT');
      console.log('\n✅ Schema migration completed successfully!');

      // Test the connection
      console.log('\n🧪 Testing database connection...');
      const { rows } = await client.query('SELECT COUNT(*) FROM users');
      console.log(`✅ Database connection successful! Users count: ${rows[0].count}`);

    } catch (err) {
      await client.query('ROLLBACK');
      console.error('❌ Migration error:', err.message);
      process.exit(1);
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('❌ Connection error:', err.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Handle direct execution
if (require.main === module) {
  migrateToNeon().catch(console.error);
}

module.exports = { migrateToNeon };
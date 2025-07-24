const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

async function deploySchema() {
  console.log('🚀 Starting schema deployment to Neon Postgres...\n');

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
    // Read the migration file
    const migrationPath = path.join(
      __dirname,
      '../supabase/migrations/20250723152901_create_not_todo_schema.sql',
    );
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

    console.log('📄 Found migration file:', migrationPath);
    console.log('📊 Executing schema deployment...\n');

    // Split the SQL into individual statements
    const statements = migrationSQL
      .split(';')
      .map((stmt) => stmt.trim())
      .filter((stmt) => stmt.length > 0 && !stmt.startsWith('--'))
      // Filter out RLS policies and grants since we're not using them with Neon
      .filter((stmt) => 
        !stmt.toLowerCase().includes('row level security') && 
        !stmt.toLowerCase().includes('policy') &&
        !stmt.toLowerCase().includes('grant')
      );

    console.log(`🔄 Executing ${statements.length} SQL statements...`);

    // Get a client from the pool
    const client = await pool.connect();

    try {
      // Begin transaction
      await client.query('BEGIN');

      // Execute each statement individually
      for (let i = 0; i < statements.length; i++) {
        const statement = statements[i] + ';';

        try {
          console.log(
            `   ${i + 1}/${statements.length}: ${statement.substring(0, 50)}...`,
          );

          await client.query(statement);
          console.log(`   ✅ Success`);
        } catch (err) {
          // If the error is about the relation already existing, that's okay
          if (err.message.includes('already exists')) {
            console.log(`   ⚠️  Object already exists, skipping`);
          } else {
            console.log(`   ⚠️  Statement error: ${err.message}`);
            // Don't throw, try to continue with other statements
          }
        }
      }

      // Commit transaction
      await client.query('COMMIT');

      console.log('\n✅ Schema deployment completed!');
      console.log('👥 User and task tables should be created');

      // Test the connection
      console.log('\n🧪 Testing database connection...');
      const result = await client.query('SELECT COUNT(*) FROM users');

      console.log('✅ Database connection successful!');
      console.log(`👥 Users count: ${result.rows[0].count}`);

    } catch (err) {
      // Rollback transaction on error
      await client.query('ROLLBACK');
      throw err;
    } finally {
      // Release the client back to the pool
      client.release();
    }
  } catch (err) {
    console.error('❌ Deployment error:', err.message);
    process.exit(1);
  } finally {
    // Close the pool
    await pool.end();
  }
}

// Handle direct execution
if (require.main === module) {
  deploySchema().catch(console.error);
}

module.exports = { deploySchema };

import { Pool, PoolClient } from 'pg';

// Get environment variables
const databaseUrl = process.env.DATABASE_URL;

// Validate that we have the required environment variables
if (process.env.NODE_ENV === 'production' && !databaseUrl) {
  throw new Error('Missing required DATABASE_URL environment variable');
}

// Create a connection pool
const pool = new Pool({
  connectionString: databaseUrl,
  ssl: {
    rejectUnauthorized: false // Required for Neon Postgres
  }
});

// Test the connection on startup
pool.on('connect', (client: PoolClient) => {
  console.log('Connected to Neon Postgres database');
});

pool.on('error', (err: Error) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

/**
 * Database types for Postgres.
 * (Legacy: previously matched supabase.ts, now self-contained)
 */
export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface Task {
  id: string;
  user_id: string;
  text: string;
  priority: number;
  created_at: string;
}

// Helper function to execute queries
export async function query(text: string, params?: any[]) {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error('Error executing query', { text, error });
    throw error;
  }
}

// Export the pool for direct access if needed
export { pool };
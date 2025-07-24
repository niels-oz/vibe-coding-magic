This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or newer)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Supabase CLI](https://supabase.com/docs/guides/cli) - for local development

### Supabase Setup

This project uses Supabase as its backend. Follow these steps to set up Supabase:

1. **Install Supabase CLI** (if not already installed):
   ```bash
   npm i supabase --save-dev
   ```

2. **Set up environment variables**:
   
   Create a `.env.local` file in the root directory with the following variables:

   ```
   # For local development (these are set automatically when running supabase start)
   NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
   
   # For schema deployment (get this from your Supabase project settings)
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

   For production, replace these values with your actual Supabase project credentials.

3. **Start the local Supabase instance**:
   ```bash
   npm run db:local
   ```
   This will start a local Supabase instance with all the necessary services.

4. **Deploy the database schema**:
   ```bash
   npm run deploy:schema
   ```
   This will create the necessary tables and set up Row Level Security policies.

5. **Test the connection**:
   ```bash
   npm run test:db
   ```
   This will verify that your app can connect to the Supabase instance.

### Running the Application

Once Supabase is set up, you can start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Database Schema

The application uses two main tables:

1. **users** - Stores user information
   - id (UUID, primary key)
   - email (TEXT, unique)
   - created_at (TIMESTAMP)

2. **tasks** - Stores not-to-do items
   - id (UUID, primary key)
   - user_id (UUID, foreign key to users.id)
   - text (TEXT)
   - priority (INTEGER, 1-5)
   - created_at (TIMESTAMP)

Row Level Security (RLS) policies are in place to ensure users can only access their own data.

## Troubleshooting

### Common Issues

1. **Connection errors with local Supabase**:
   - Ensure the Supabase local instance is running (`npm run db:local`)
   - Check that your `.env.local` file has the correct URL and keys

2. **Schema deployment failures**:
   - For local development, try stopping and restarting the Supabase instance
   - For production, ensure you have the correct `SUPABASE_SERVICE_ROLE_KEY`

3. **Row Level Security (RLS) issues**:
   - If you're having trouble accessing data, the RLS policies might be too restrictive
   - Run `npm run test:user-creation` to test if the RLS policies are working correctly

4. **Stopping the local Supabase instance**:
   ```bash
   npm run db:stop
   ```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

For Supabase documentation:
- [Supabase Documentation](https://supabase.com/docs) - learn about Supabase features and API.
- [Supabase CLI](https://supabase.com/docs/guides/cli) - learn about the Supabase CLI.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

When deploying to Vercel, make sure to add the Supabase environment variables in the Vercel project settings.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

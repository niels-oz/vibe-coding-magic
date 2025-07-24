This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or newer)
- [npm](https://www.npmjs.com/) (comes with Node.js)

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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.


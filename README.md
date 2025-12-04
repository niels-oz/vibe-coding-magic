# Vibe Coding Magic

A productivity web app built with [Next.js](https://nextjs.org) and Supabase to help you manage your "not-to-do" list and focus on what matters. Track distractions, set priorities, and gain insights into your workflow.

## 🚀 Features

- User authentication (Supabase Auth)
- Add, view, and prioritize not-to-do tasks
- Real-time sync and database security (RLS)
- Responsive and modern UI

## 🛠️ Tech Stack

- **Frontend:** Next.js, React
- **Backend:** Supabase (PostgreSQL, Auth, RLS)
- **Styling:** (add your CSS framework if any)

## 📝 Database Schema

- **users**: id (UUID, PK), email (TEXT, unique), created_at (TIMESTAMP)
- **tasks**: id (UUID, PK), user_id (UUID, FK), text (TEXT), priority (INTEGER 1-5), created_at (TIMESTAMP)
- RLS ensures users access only their data

## ⚙️ Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) v18+
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Supabase account](https://supabase.com/)

### 1. Clone & Install
```bash
git clone <repo-url>
cd vibe-coding-magic
npm install
```

### 2. Configure Supabase
- Create a new project in Supabase
- Set up the `users` and `tasks` tables (see schema above)
- Enable Row Level Security (RLS) and create policies
- Get your Supabase URL and anon/public key

### 3. Environment Variables
Create a `.env.local` file at the root:
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 4. Run the App
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000)
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
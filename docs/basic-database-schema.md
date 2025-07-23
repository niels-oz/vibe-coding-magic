# Not To Do List App - Super Simple Database Schema 🤙

Just two tables to get your vibe going! No overthinking, just the essentials.

## The Basics

### 1. Users Table

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
```

### 2. Tasks Table

```sql
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    text TEXT NOT NULL,
    priority INTEGER NOT NULL CHECK (priority >= 1 AND priority <= 5),
    created_at TIMESTAMP DEFAULT NOW()
);
```

## That's it!

### Priority levels (same as your current app):

- 1: 'Meh'
- 2: 'Rather not'
- 3: "Don't want to"
- 4: "Really don't want to"
- 5: 'Absolutely must avoid'

### Basic queries you'll need:

Get all tasks for a user:

```sql
SELECT * FROM tasks WHERE user_id = $1 ORDER BY priority DESC;
```

Delete a task:

```sql
DELETE FROM tasks WHERE id = $1;
```

Update task text or priority:

```sql
UPDATE tasks SET text = $2, priority = $3 WHERE id = $1;
```

### Security (if using Supabase):

```sql
-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Users see their own data
CREATE POLICY "Users see own profile" ON users FOR ALL USING (auth.uid() = id);
CREATE POLICY "Users see own tasks" ON tasks FOR ALL USING (auth.uid() = user_id);
```

Perfect for vibe coding! Add more stuff later if you need it. 🚀

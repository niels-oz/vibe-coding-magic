-- Tasks table for not-to-do items
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    text TEXT NOT NULL,
    priority INTEGER NOT NULL CHECK (priority >= 1 AND priority <= 5),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS for security
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Users can only see their own tasks
CREATE POLICY "Users see own tasks" ON tasks FOR ALL USING (auth.uid() = user_id); 
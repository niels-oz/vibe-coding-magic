'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PrioritySelector } from './PrioritySelector';
import { Priority } from '@/types/not-todo';

interface NotToDoFormProps {
  onAddItem: (text: string, priority: Priority) => void;
}

export function NotToDoForm({ onAddItem }: NotToDoFormProps) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>(3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddItem(text.trim(), priority);
      setText('');
      setPriority(3);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as React.FormEvent);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="not-todo-text">What do you want to avoid doing?</Label>
        <Input
          id="not-todo-text"
          type="text"
          placeholder="e.g., Scrolling social media for hours..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="priority-selector">How badly do you want to avoid this?</Label>
        <PrioritySelector
          value={priority}
          onChange={setPriority}
          id="priority-selector"
        />
      </div>
      
      <Button 
        type="submit" 
        disabled={!text.trim()}
        className="w-full"
      >
        Add to Not-To-Do List
      </Button>
    </form>
  );
} 
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

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (text.trim()) {
      onAddItem(text.trim(), priority);
      setText('');
      setPriority(3); // Reset to default priority
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as React.FormEvent);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-3">
        <Label htmlFor="not-todo-text" className="text-base font-medium">
          What do you want to avoid doing?
        </Label>
        <Input
          id="not-todo-text"
          type="text"
          placeholder="e.g., Scrolling social media for hours..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full text-base py-3 border-border/60 focus:border-[#e00014]/50 focus:ring-[#e00014]/20"
        />
      </div>

      <div className="space-y-3">
        <Label htmlFor="priority-selector" className="text-base font-medium">
          How badly do you want to avoid this?
        </Label>
        <PrioritySelector
          value={priority}
          onChange={setPriority}
          id="priority-selector"
        />
      </div>

      <Button
        type="submit"
        disabled={!text.trim()}
        className="w-full bg-[#e00014] hover:bg-[#b8000f] text-white py-3 text-base font-medium transition-all duration-200 shadow-lg shadow-[#e00014]/20 hover:shadow-[#e00014]/30 disabled:bg-muted disabled:text-muted-foreground disabled:shadow-none"
      >
        Add to Not-To-Do List
      </Button>
    </form>
  );
}

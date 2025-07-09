'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PRIORITY_LABELS, Priority } from '@/types/not-todo';

interface PrioritySelectorProps {
  value: Priority;
  onChange: (priority: Priority) => void;
  id?: string;
}

export function PrioritySelector({ value, onChange, id }: PrioritySelectorProps) {
  return (
    <Select
      value={value.toString()}
      onValueChange={(val) => onChange(parseInt(val) as Priority)}
    >
      <SelectTrigger id={id} className="w-full">
        <SelectValue placeholder="Select priority level" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(PRIORITY_LABELS).map(([priority, label]) => (
          <SelectItem key={priority} value={priority}>
            <div className="flex items-center space-x-2">
              <span className="font-medium">{priority}.</span>
              <span>{label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
} 
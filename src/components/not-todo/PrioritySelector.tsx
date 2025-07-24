'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PRIORITY_LABELS, PRIORITY_COLORS, PRIORITY_EMOJIS, Priority } from '@/types/not-todo';
import { Badge } from '@/components/ui/badge';

interface PrioritySelectorProps {
  value: Priority;
  onChange: (priority: Priority) => void;
  id?: string;
}

export function PrioritySelector({
  value,
  onChange,
  id,
}: PrioritySelectorProps) {
  return (
    <Select
      value={value.toString()}
      onValueChange={(val) => onChange(parseInt(val) as Priority)}
    >
      <SelectTrigger
        id={id}
        className="w-full border-border/60 focus:border-[#e00014]/50 focus:ring-[#e00014]/20 transition-all duration-200"
      >
        <SelectValue placeholder="Select priority level">
          <div className="flex items-center gap-3">
            <Badge
              className={`${PRIORITY_COLORS[value]} text-xs px-2 py-1 border transition-all duration-200`}
            >
              {PRIORITY_EMOJIS[value]}
            </Badge>
            <span className="text-sm">{PRIORITY_LABELS[value]}</span>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="border-border/60">
        {Object.entries(PRIORITY_LABELS).map(([priority, label]) => {
          const priorityNum = parseInt(priority) as Priority;
          return (
            <SelectItem
              key={priority}
              value={priority}
              className="focus:bg-[#e00014]/10 focus:text-[#e00014] cursor-pointer"
            >
              <div className="flex items-center gap-3 w-full">
                <Badge
                  className={`${PRIORITY_COLORS[priorityNum]} text-xs px-2 py-1 border transition-all duration-200`}
                >
                  {PRIORITY_EMOJIS[priorityNum]}
                </Badge>
                <span className="text-sm font-medium">{label}</span>
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}

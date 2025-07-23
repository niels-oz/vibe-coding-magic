'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { SortOption, SortDirection } from '@/types/not-todo';

interface SortControlsProps {
  sortBy: SortOption;
  sortDirection: SortDirection;
  onSortChange: (sortBy: SortOption, sortDirection: SortDirection) => void;
  itemCount: number;
}

export function SortControls({
  sortBy,
  sortDirection,
  onSortChange,
  itemCount,
}: SortControlsProps) {
  const handleSortByChange = (newSortBy: SortOption) => {
    onSortChange(newSortBy, sortDirection);
  };

  const handleDirectionToggle = () => {
    const newDirection: SortDirection =
      sortDirection === 'asc' ? 'desc' : 'asc';
    onSortChange(sortBy, newDirection);
  };

  return (
    <div className="flex items-center justify-between gap-4 py-3 px-1">
      <div className="text-sm font-medium text-muted-foreground">
        {itemCount === 0 ? (
          <span className="text-muted-foreground/60">No items yet</span>
        ) : (
          <span>
            {itemCount} item{itemCount === 1 ? '' : 's'}
          </span>
        )}
      </div>

      {itemCount > 0 && (
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-muted-foreground">
            Sort by:
          </span>

          <Select value={sortBy} onValueChange={handleSortByChange}>
            <SelectTrigger className="w-auto min-w-[140px] border-border/60 focus:border-[#e00014]/50 focus:ring-[#e00014]/20 transition-all duration-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border-border/60">
              <SelectItem
                value="priority"
                className="focus:bg-[#e00014]/10 focus:text-[#e00014]"
              >
                Priority
              </SelectItem>
              <SelectItem
                value="date"
                className="focus:bg-[#e00014]/10 focus:text-[#e00014]"
              >
                Date Added
              </SelectItem>
              <SelectItem
                value="alphabetical"
                className="focus:bg-[#e00014]/10 focus:text-[#e00014]"
              >
                Alphabetical
              </SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="sm"
            onClick={handleDirectionToggle}
            className="px-3 py-2 border-border/60 hover:border-[#e00014]/50 hover:bg-[#e00014]/10 hover:text-[#e00014] transition-all duration-200"
          >
            {sortDirection === 'asc' ? (
              <ArrowUp className="h-4 w-4" />
            ) : (
              <ArrowDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      )}
    </div>
  );
}

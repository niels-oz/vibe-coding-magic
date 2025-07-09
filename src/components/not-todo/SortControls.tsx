'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { SortOption, SortDirection } from '@/types/not-todo';

interface SortControlsProps {
  sortBy: SortOption;
  sortDirection: SortDirection;
  onSortChange: (sortBy: SortOption, sortDirection: SortDirection) => void;
  itemCount: number;
}

export function SortControls({ sortBy, sortDirection, onSortChange, itemCount }: SortControlsProps) {
  const handleSortByChange = (newSortBy: SortOption) => {
    onSortChange(newSortBy, sortDirection);
  };

  const handleDirectionToggle = () => {
    const newDirection: SortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    onSortChange(sortBy, newDirection);
  };



  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <div className="text-sm text-muted-foreground">
        {itemCount === 0 ? 'No items yet' : `${itemCount} item${itemCount === 1 ? '' : 's'}`}
      </div>
      
      {itemCount > 0 && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          
          <Select value={sortBy} onValueChange={handleSortByChange}>
            <SelectTrigger className="w-auto min-w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="priority">Priority</SelectItem>
              <SelectItem value="date">Date Added</SelectItem>
              <SelectItem value="alphabetical">Alphabetical</SelectItem>
            </SelectContent>
          </Select>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleDirectionToggle}
            className="px-2"
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
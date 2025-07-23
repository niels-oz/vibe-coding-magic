'use client';

import { NotToDoItem as NotToDoItemType } from '@/types/not-todo';
import { NotToDoItem } from './NotToDoItem';

interface NotToDoListProps {
  items: NotToDoItemType[];
  onDeleteItem: (id: string) => void;
  onUpdateItem: (
    id: string,
    updates: Partial<Pick<NotToDoItemType, 'text' | 'priority'>>,
  ) => void;
  onMarkAvoided: () => void; // Keep for compatibility but not used
}

export function NotToDoList({
  items,
  onDeleteItem,
  onUpdateItem,
}: NotToDoListProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <div className="text-6xl mb-4">🚫</div>
        <h3 className="text-xl font-semibold mb-2">
          No items in your not-to-do list yet
        </h3>
        <p className="text-sm">
          Add something you want to avoid doing to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <NotToDoItem
          key={item.id}
          item={item}
          onDelete={onDeleteItem}
          onUpdate={onUpdateItem}
        />
      ))}
    </div>
  );
}

'use client';

import { NotToDoItem as NotToDoItemType } from '@/types/not-todo';
import { NotToDoItem } from './NotToDoItem';
import { useLanguage } from '@/contexts/LanguageContext';

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
  const { t } = useLanguage();
  if (items.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <div className="text-6xl mb-4">🚫</div>
        <h3 className="text-xl font-semibold mb-2">
          {t.noItemsYet}
        </h3>
        <p className="text-sm">
          {t.noItemsDescription}
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
export interface NotToDoItem {
  id: string;
  text: string;
  priority: 1 | 2 | 3 | 4 | 5;
  createdAt: Date;
  avoidedToday: boolean;
  lastAvoidedDate?: Date;
}

export interface NotToDoState {
  items: NotToDoItem[];
  sortBy: 'priority' | 'date' | 'alphabetical';
  sortDirection: 'asc' | 'desc';
}

export type SortOption = 'priority' | 'date' | 'alphabetical';
export type SortDirection = 'asc' | 'desc';
export type Priority = 1 | 2 | 3 | 4 | 5;

export const PRIORITY_LABELS: Record<Priority, string> = {
  1: 'Meh',
  2: 'Rather not',
  3: "Don't want to",
  4: "Really don't want to", 
  5: 'Absolutely must avoid'
};

export const PRIORITY_COLORS: Record<Priority, string> = {
  1: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
  2: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
  3: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
  4: 'bg-orange-100 text-orange-800 hover:bg-orange-200',
  5: 'bg-red-100 text-red-800 hover:bg-red-200'
}; 
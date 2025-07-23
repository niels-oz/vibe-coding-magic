export interface NotToDoItem {
  id: string;
  text: string;
  priority: 1 | 2 | 3 | 4 | 5;
  created_at: string; // Now comes from database as ISO string
  user_id: string; // Added for database relation
}

export interface NotToDoState {
  items: NotToDoItem[];
  sortBy: 'priority' | 'date' | 'alphabetical';
  sortDirection: 'asc' | 'desc';
  currentUser: {
    id: string;
    email: string;
  } | null;
  isLoading: boolean;
}

export type SortOption = 'priority' | 'date' | 'alphabetical';
export type SortDirection = 'asc' | 'desc';
export type Priority = 1 | 2 | 3 | 4 | 5;

export const PRIORITY_LABELS: Record<Priority, string> = {
  1: 'Meh',
  2: 'Rather not',
  3: "Don't want to",
  4: "Really don't want to",
  5: 'Absolutely must avoid',
};

export const PRIORITY_COLORS: Record<Priority, string> = {
  1: 'bg-slate-500/20 text-slate-300 border-slate-500/30 hover:bg-slate-500/30',
  2: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30 hover:bg-yellow-500/30',
  3: 'bg-orange-500/20 text-orange-300 border-orange-500/30 hover:bg-orange-500/30',
  4: 'bg-red-500/30 text-red-300 border-red-500/40 hover:bg-red-500/40',
  5: 'bg-gradient-to-r from-red-600/40 to-[#e00014]/50 text-red-200 border-[#e00014]/60 hover:from-red-600/50 hover:to-[#e00014]/60 shadow-[#e00014]/20 shadow-md',
};

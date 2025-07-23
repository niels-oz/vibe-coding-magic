'use client';

import { useState, useEffect } from 'react';
import {
  NotToDoItem,
  NotToDoState,
  SortOption,
  SortDirection,
} from '@/types/not-todo';
import { NotToDoForm } from './NotToDoForm';
import { NotToDoList } from './NotToDoList';
import { SortControls } from './SortControls';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export function NotToDoApp() {
  const [state, setState] = useState<NotToDoState>({
    items: [],
    sortBy: 'priority',
    sortDirection: 'desc',
  });
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount and mark as hydrated
  useEffect(() => {
    const stored = localStorage.getItem('not-todo-items');
    if (stored) {
      try {
        const parsedState = JSON.parse(stored);
        // Convert date strings back to Date objects
        parsedState.items = parsedState.items.map((item: NotToDoItem) => ({
          ...item,
          createdAt: new Date(item.createdAt),
          lastAvoidedDate: item.lastAvoidedDate
            ? new Date(item.lastAvoidedDate)
            : undefined,
        }));
        setState(parsedState);
      } catch (error) {
        console.error(
          'Failed to load not-to-do items from localStorage:',
          error,
        );
      }
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage whenever state changes (only after hydration)
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('not-todo-items', JSON.stringify(state));
    }
  }, [state, isHydrated]);

  // Daily reset logic - reset avoidedToday if last avoided date is not today
  useEffect(() => {
    const today = new Date().toDateString();
    setState((prevState) => ({
      ...prevState,
      items: prevState.items.map((item) => ({
        ...item,
        avoidedToday: item.lastAvoidedDate?.toDateString() === today,
      })),
    }));
  }, []);

  const addItem = (text: string, priority: 1 | 2 | 3 | 4 | 5) => {
    const newItem: NotToDoItem = {
      id: crypto.randomUUID(),
      text,
      priority,
      createdAt: new Date(),
      avoidedToday: false,
    };
    setState((prevState) => ({
      ...prevState,
      items: [...prevState.items, newItem],
    }));
  };

  const deleteItem = (id: string) => {
    setState((prevState) => ({
      ...prevState,
      items: prevState.items.filter((item) => item.id !== id),
    }));
  };

  const updateItem = (id: string, updates: Partial<NotToDoItem>) => {
    setState((prevState) => ({
      ...prevState,
      items: prevState.items.map((item) =>
        item.id === id ? { ...item, ...updates } : item,
      ),
    }));
  };

  const markAvoidedToday = (id: string) => {
    const now = new Date();
    updateItem(id, {
      avoidedToday: true,
      lastAvoidedDate: now,
    });
  };

  const updateSort = (sortBy: SortOption, sortDirection: SortDirection) => {
    setState((prevState) => ({
      ...prevState,
      sortBy,
      sortDirection,
    }));
  };

  // Sort items based on current sort settings
  const sortedItems = [...state.items].sort((a, b) => {
    let comparison = 0;

    switch (state.sortBy) {
      case 'priority':
        comparison = a.priority - b.priority;
        break;
      case 'date':
        comparison = a.createdAt.getTime() - b.createdAt.getTime();
        break;
      case 'alphabetical':
        comparison = a.text.localeCompare(b.text);
        break;
    }

    return state.sortDirection === 'asc' ? comparison : -comparison;
  });

  // Prevent hydration mismatch by not rendering content until after client-side hydration
  if (!isHydrated) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
        <Card className="border-border/50 shadow-lg shadow-black/10">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-foreground via-[#e00014] to-foreground bg-clip-text text-transparent">
              Not-To-Do List
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground mt-2">
              Track things you want to avoid doing, sorted by how badly you
              don&apos;t want to do them
            </CardDescription>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#e00014] to-transparent mx-auto mt-4 rounded-full"></div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="animate-pulse space-y-6">
              <div className="h-32 bg-muted/30 rounded-lg"></div>
              <div className="h-8 bg-muted/20 rounded"></div>
              <div className="h-12 bg-muted/20 rounded"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <Card className="border-border/50 shadow-lg shadow-black/10">
        <CardHeader className="text-center pb-8">
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-foreground via-[#e00014] to-foreground bg-clip-text text-transparent">
            Not-To-Do List
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground mt-2">
            Track things you want to avoid doing, sorted by how badly you
            don&apos;t want to do them
          </CardDescription>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#e00014] to-transparent mx-auto mt-4 rounded-full"></div>
        </CardHeader>
        <CardContent className="space-y-6">
          <NotToDoForm onAddItem={addItem} />

          <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />

          <SortControls
            sortBy={state.sortBy}
            sortDirection={state.sortDirection}
            onSortChange={updateSort}
            itemCount={state.items.length}
          />

          <NotToDoList
            items={sortedItems}
            onDeleteItem={deleteItem}
            onUpdateItem={updateItem}
            onMarkAvoided={markAvoidedToday}
          />
        </CardContent>
      </Card>
    </div>
  );
}

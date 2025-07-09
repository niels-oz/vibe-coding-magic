'use client';

import { useState, useEffect } from 'react';
import { NotToDoItem, NotToDoState, SortOption, SortDirection } from '@/types/not-todo';
import { NotToDoForm } from './NotToDoForm';
import { NotToDoList } from './NotToDoList';
import { SortControls } from './SortControls';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export function NotToDoApp() {
  const [state, setState] = useState<NotToDoState>({
    items: [],
    sortBy: 'priority',
    sortDirection: 'desc'
  });

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('not-todo-items');
    if (stored) {
      try {
        const parsedState = JSON.parse(stored);
        // Convert date strings back to Date objects
        parsedState.items = parsedState.items.map((item: NotToDoItem) => ({
          ...item,
          createdAt: new Date(item.createdAt),
          lastAvoidedDate: item.lastAvoidedDate ? new Date(item.lastAvoidedDate) : undefined
        }));
        setState(parsedState);
      } catch (error) {
        console.error('Failed to load not-to-do items from localStorage:', error);
      }
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('not-todo-items', JSON.stringify(state));
  }, [state]);

  // Daily reset logic - reset avoidedToday if last avoided date is not today
  useEffect(() => {
    const today = new Date().toDateString();
    setState(prevState => ({
      ...prevState,
      items: prevState.items.map(item => ({
        ...item,
        avoidedToday: item.lastAvoidedDate?.toDateString() === today
      }))
    }));
  }, []);

  const addItem = (text: string, priority: 1 | 2 | 3 | 4 | 5) => {
    const newItem: NotToDoItem = {
      id: crypto.randomUUID(),
      text,
      priority,
      createdAt: new Date(),
      avoidedToday: false
    };
    setState(prevState => ({
      ...prevState,
      items: [...prevState.items, newItem]
    }));
  };

  const deleteItem = (id: string) => {
    setState(prevState => ({
      ...prevState,
      items: prevState.items.filter(item => item.id !== id)
    }));
  };

  const updateItem = (id: string, updates: Partial<NotToDoItem>) => {
    setState(prevState => ({
      ...prevState,
      items: prevState.items.map(item =>
        item.id === id ? { ...item, ...updates } : item
      )
    }));
  };

  const markAvoidedToday = (id: string) => {
    const now = new Date();
    updateItem(id, { 
      avoidedToday: true, 
      lastAvoidedDate: now 
    });
  };

  const updateSort = (sortBy: SortOption, sortDirection: SortDirection) => {
    setState(prevState => ({
      ...prevState,
      sortBy,
      sortDirection
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

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Not-To-Do List
          </CardTitle>
          <CardDescription className="text-center">
            Track things you want to avoid doing, sorted by how badly you don&apos;t want to do them
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <NotToDoForm onAddItem={addItem} />
          
          <Separator />
          
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
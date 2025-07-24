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
import { UserOnboarding } from './UserOnboarding';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
// Define types locally for client-side use
interface User {
  id: string;
  email: string;
}

interface Task {
  id: string;
  user_id: string;
  text: string;
  priority: number;
  created_at: string;
}

export function NotToDoApp() {
  const [state, setState] = useState<NotToDoState>({
    items: [],
    sortBy: 'priority',
    sortDirection: 'desc',
    currentUser: null,
    isLoading: true,
  });
  const [mounted, setMounted] = useState(false);

  // Set mounted state after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize user and load tasks after component mounts
  useEffect(() => {
    if (mounted) {
      initializeApp();
    }
  }, [mounted]);

  const initializeApp = async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true }));

      // Check if there's a saved user email
      const savedEmail = localStorage.getItem('currentUserEmail');

      if (savedEmail) {
        // Get or create user and load their tasks
        await handleUserCreated(savedEmail);
      } else {
        // No user, show onboarding
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    } catch (error) {
      console.error('Error initializing app:', error);
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const handleUserCreated = async (email: string) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true }));

      // Get or create user via API
      const userResponse = await fetch(`/api/users?email=${encodeURIComponent(email)}`);
      if (!userResponse.ok) {
        throw new Error(`Failed to get or create user: ${userResponse.statusText}`);
      }
      const user: User = await userResponse.json();
      localStorage.setItem('currentUserEmail', email);

      // Load user's tasks via API
      const tasksResponse = await fetch(`/api/tasks?userId=${encodeURIComponent(user.id)}`);
      if (!tasksResponse.ok) {
        throw new Error(`Failed to load tasks: ${tasksResponse.statusText}`);
      }
      const tasks: Task[] = await tasksResponse.json();

      // Convert database tasks to app format
      const items: NotToDoItem[] = tasks.map((task: Task) => ({
        id: task.id,
        text: task.text,
        priority: task.priority as 1 | 2 | 3 | 4 | 5,
        created_at: task.created_at,
        user_id: task.user_id,
      }));

      setState((prev) => ({
        ...prev,
        currentUser: { id: user.id, email: user.email },
        items,
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error creating/loading user:', error);
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const addItem = async (text: string, priority: 1 | 2 | 3 | 4 | 5) => {
    if (!state.currentUser) return;

    try {
      const addTaskResponse = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: state.currentUser.id, text, priority }),
      });
      if (!addTaskResponse.ok) {
        throw new Error(`Failed to add task: ${addTaskResponse.statusText}`);
      }
      const task: Task = await addTaskResponse.json();

      const newItem: NotToDoItem = {
        id: task.id,
        text: task.text,
        priority: task.priority as 1 | 2 | 3 | 4 | 5,
        created_at: task.created_at,
        user_id: task.user_id,
      };

      setState((prev) => ({
        ...prev,
        items: [newItem, ...prev.items], // Add to beginning since we sort by created_at desc
      }));
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const deleteItem = async (id: string) => {
    try {
      const deleteTaskResponse = await fetch(`/api/tasks?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      if (!deleteTaskResponse.ok) {
        throw new Error(`Failed to delete task: ${deleteTaskResponse.statusText}`);
      }
      setState((prev) => ({
        ...prev,
        items: prev.items.filter((item) => item.id !== id),
      }));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const updateItem = async (
    id: string,
    updates: Partial<Pick<NotToDoItem, 'text' | 'priority'>>,
  ) => {
    try {
      const updateTaskResponse = await fetch('/api/tasks', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, updates }),
      });
      if (!updateTaskResponse.ok) {
        throw new Error(`Failed to update task: ${updateTaskResponse.statusText}`);
      }
      const updatedTask: Task = await updateTaskResponse.json();

      setState((prev) => ({
        ...prev,
        items: prev.items.map((item) =>
          item.id === id
            ? {
                ...item,
                text: updatedTask.text,
                priority: updatedTask.priority as 1 | 2 | 3 | 4 | 5,
              }
            : item,
        ),
      }));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const updateSort = (sortBy: SortOption, sortDirection: SortDirection) => {
    setState((prev) => ({
      ...prev,
      sortBy,
      sortDirection,
    }));
  };

  const handleSignOut = () => {
    localStorage.removeItem('currentUserEmail');
    setState({
      items: [],
      sortBy: 'priority',
      sortDirection: 'desc',
      currentUser: null,
      isLoading: false,
    });
  };

  // Sort items based on current sort settings
  const sortedItems = [...state.items].sort((a, b) => {
    let comparison = 0;

    switch (state.sortBy) {
      case 'priority':
        comparison = a.priority - b.priority;
        break;
      case 'date':
        comparison =
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        break;
      case 'alphabetical':
        comparison = a.text.localeCompare(b.text);
        break;
    }

    return state.sortDirection === 'asc' ? comparison : -comparison;
  });

  // Prevent hydration mismatch during SSR
  if (!mounted) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
        <Card className="border-border/50 shadow-lg shadow-black/10">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-foreground via-[#e00014] to-foreground bg-clip-text text-transparent">
              Not-To-Do List
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground mt-2">
              Loading...
            </CardDescription>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#e00014] to-transparent mx-auto mt-4 rounded-full"></div>
          </CardHeader>
        </Card>
      </div>
    );
  }

  // Show loading state
  if (state.isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
        <Card className="border-border/50 shadow-lg shadow-black/10">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-foreground via-[#e00014] to-foreground bg-clip-text text-transparent">
              Not-To-Do List
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground mt-2">
              Loading your personal not-to-do list...
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

  // Show onboarding if no user
  if (!state.currentUser) {
    return (
      <UserOnboarding
        onUserCreated={handleUserCreated}
        isLoading={state.isLoading}
      />
    );
  }

  // Main app with user
  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <Card className="border-border/50 shadow-lg shadow-black/10">
        <CardHeader className="text-center pb-8">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <CardTitle className="text-4xl font-bold bg-gradient-to-r from-foreground via-[#e00014] to-foreground bg-clip-text text-transparent">
                Not-To-Do List
              </CardTitle>
              <CardDescription className="text-lg text-muted-foreground mt-2">
                Welcome back, {state.currentUser.email}!
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
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
            onMarkAvoided={() => {}} // We removed the avoided functionality
          />
        </CardContent>
      </Card>
    </div>
  );
}

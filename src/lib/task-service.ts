import { supabase, Task } from './supabase';

export class TaskService {
  // Get all tasks for a user
  static async getTasksForUser(userId: string): Promise<Task[]> {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  }

  // Add a new task
  static async addTask(
    userId: string,
    text: string,
    priority: number,
  ): Promise<Task> {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert([
          {
            user_id: userId,
            text,
            priority,
          },
        ])
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error adding task:', error);
      throw error;
    }
  }

  // Update a task
  static async updateTask(
    taskId: string,
    updates: Partial<Pick<Task, 'text' | 'priority'>>,
  ): Promise<Task> {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .update(updates)
        .eq('id', taskId)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  }

  // Delete a task
  static async deleteTask(taskId: string): Promise<void> {
    try {
      const { error } = await supabase.from('tasks').delete().eq('id', taskId);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }
}

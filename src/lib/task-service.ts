import { query, Task } from './postgres';

export class TaskService {
  // Get all tasks for a user
  static async getTasksForUser(userId: string): Promise<Task[]> {
    try {
      const result = await query(
        'SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC',
        [userId]
      );

      return result.rows;
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
      const result = await query(
        `INSERT INTO tasks (user_id, text, priority) 
         VALUES ($1, $2, $3) 
         RETURNING *`,
        [userId, text, priority]
      );

      return result.rows[0];
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
      // Build the SET part of the query dynamically based on what's being updated
      const setClauses = [];
      const values = [];
      let paramIndex = 1;

      if (updates.text !== undefined) {
        setClauses.push(`text = $${paramIndex}`);
        values.push(updates.text);
        paramIndex++;
      }

      if (updates.priority !== undefined) {
        setClauses.push(`priority = $${paramIndex}`);
        values.push(updates.priority);
        paramIndex++;
      }

      // Add the taskId as the last parameter
      values.push(taskId);

      const result = await query(
        `UPDATE tasks 
         SET ${setClauses.join(', ')} 
         WHERE id = $${paramIndex} 
         RETURNING *`,
        values
      );

      if (result.rows.length === 0) {
        throw new Error(`Task with ID ${taskId} not found`);
      }

      return result.rows[0];
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  }

  // Delete a task
  static async deleteTask(taskId: string): Promise<void> {
    try {
      const result = await query('DELETE FROM tasks WHERE id = $1', [taskId]);

      if (result.rowCount === 0) {
        throw new Error(`Task with ID ${taskId} not found`);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }
}

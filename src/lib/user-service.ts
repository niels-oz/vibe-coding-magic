import { query, User } from './postgres';

// Simple user management for local development
export class UserService {
  private static CURRENT_USER_KEY = 'current-user-email';

  // Get or create a user based on email
  static async getOrCreateUser(email: string): Promise<User> {
    try {
      // First, try to find existing user
      const existingUserResult = await query(
        'SELECT * FROM users WHERE email = $1',
        [email]
      );

      if (existingUserResult.rows.length > 0) {
        return existingUserResult.rows[0];
      }

      // If user doesn't exist, create them
      const newUserResult = await query(
        'INSERT INTO users (email) VALUES ($1) RETURNING *',
        [email]
      );

      if (newUserResult.rows.length === 0) {
        throw new Error('Failed to create user');
      }

      return newUserResult.rows[0];
    } catch (error) {
      console.error('Error getting/creating user:', error);
      throw error;
    }
  }

  // Save current user email to localStorage for simple persistence
  static setCurrentUserEmail(email: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.CURRENT_USER_KEY, email);
    }
  }

  // Get current user email from localStorage
  static getCurrentUserEmail(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.CURRENT_USER_KEY);
    }
    return null;
  }

  // Clear current user
  static clearCurrentUser() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.CURRENT_USER_KEY);
    }
  }
}

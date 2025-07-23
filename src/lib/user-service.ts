import { supabase, User } from './supabase';

// Simple user management for local development
export class UserService {
  private static CURRENT_USER_KEY = 'current-user-email';

  // Get or create a user based on email
  static async getOrCreateUser(email: string): Promise<User> {
    try {
      // First, try to find existing user
      const { data: existingUser, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (existingUser && !fetchError) {
        return existingUser;
      }

      // If user doesn't exist, create them
      const { data: newUser, error: createError } = await supabase
        .from('users')
        .insert([{ email }])
        .select()
        .single();

      if (createError) {
        throw createError;
      }

      return newUser;
    } catch (error) {
      console.error('Error getting/creating user:', error);
      throw error;
    }
  }

  // Save current user email to localStorage for simple persistence
  static setCurrentUserEmail(email: string) {
    localStorage.setItem(this.CURRENT_USER_KEY, email);
  }

  // Get current user email from localStorage
  static getCurrentUserEmail(): string | null {
    return localStorage.getItem(this.CURRENT_USER_KEY);
  }

  // Clear current user
  static clearCurrentUser() {
    localStorage.removeItem(this.CURRENT_USER_KEY);
  }
}

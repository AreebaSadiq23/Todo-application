export interface Task {
    id: number;
    title: string;
    description?: string;
    due_date?: string; // or Date if parsed
    status: 'pending' | 'completed';
  }
  
  export interface User {
    id: number;
    username: string;
    email: string;
  }

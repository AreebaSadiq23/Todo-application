"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import api from '@/lib/api';
import styles from './dashboard.module.css';
import { motion, AnimatePresence } from 'framer-motion';

// Define the Task interface to match backend API
interface Task {
  id: number;
  title: string;
  description?: string;
  status: 'pending' | 'completed';
  due_date?: string;
}

const DashboardPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { isAuthenticated } = useAuth();
  const router = useRouter();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await api.get('/tasks/');
      setTasks(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to fetch tasks');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks();
    }
  }, [isAuthenticated]);

  // Handle adding a new task
  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    try {
      const newTaskData = {
        title: newTaskTitle,
        description: newTaskDescription.trim() || undefined,
        due_date: newTaskDueDate || undefined,
        status: 'pending',
      };
      const response = await api.post('/tasks/', newTaskData);
      setTasks([...tasks, response.data]);
      setNewTaskTitle('');
      setNewTaskDescription('');
      setNewTaskDueDate('');
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to create task');
      console.error('Error creating task:', err);
    }
  };

  // Handle deleting a task
  const handleDeleteTask = async (id: number) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to delete task');
      console.error('Error deleting task:', err);
    }
  };

  // Handle toggling task completion status
  const handleToggleComplete = async (id: number) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    const newStatus = task.status === 'completed' ? 'pending' : 'completed';

    try {
      const response = await api.patch(`/tasks/${id}`, { status: newStatus });
      setTasks(tasks.map(t => t.id === id ? response.data : t));
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to update task');
      console.error('Error updating task:', err);
    }
  };

  // Handle editing a task
  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setNewTaskTitle(task.title);
    setNewTaskDescription(task.description || '');
    setNewTaskDueDate(task.due_date || '');
  };

  // Handle saving an edited task
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTask || !newTaskTitle.trim()) return;

    try {
      const updatedTaskData = {
        title: newTaskTitle,
        description: newTaskDescription.trim() || undefined,
        due_date: newTaskDueDate || undefined,
      };
      const response = await api.patch(`/tasks/${editingTask.id}`, updatedTaskData);
      setTasks(tasks.map(task => task.id === editingTask.id ? response.data : task));
      setEditingTask(null);
      setNewTaskTitle('');
      setNewTaskDescription('');
      setNewTaskDueDate('');
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to update task');
      console.error('Error updating task:', err);
    }
  };

  // Handle cancelling edit mode
  const handleCancelEdit = () => {
    setEditingTask(null);
    setNewTaskTitle('');
    setNewTaskDescription('');
    setNewTaskDueDate('');
  };

  // Filter tasks based on selected filter
  const filteredTasks = tasks.filter(task => {
    if (filter === 'pending') return task.status === 'pending';
    if (filter === 'completed') return task.status === 'completed';
    return true; // 'all' filter
  });

  if (!isAuthenticated) {
    return null; // Will redirect via useEffect
  }

  return (
    <motion.div
      className={styles.dashboardPage}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <header className={styles.header}>
        <h1>My Personal Dashboard</h1>
        <p>Organize your tasks and boost productivity.</p>
      </header>

      {error && (
        <div className={styles.errorMessage}>
          {error}
          <button onClick={() => setError(null)} className={styles.closeError}>×</button>
        </div>
      )}

      <div className={styles.contentWrapper}>
        <aside className={styles.sidebar}>
          <h2>Filters</h2>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setFilter('all')} className={filter === 'all' ? styles.activeFilter : ''}>All Tasks</motion.button>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setFilter('pending')} className={filter === 'pending' ? styles.activeFilter : ''}>Pending</motion.button>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setFilter('completed')} className={filter === 'completed' ? styles.activeFilter : ''}>Completed</motion.button>
        </aside>

        <main className={styles.mainContent}>
          <section className={styles.taskFormSection}>
            <h2>{editingTask ? 'Edit Task' : 'Add New Task'}</h2>
            <form onSubmit={editingTask ? handleSaveEdit : handleAddTask} className={styles.taskForm}>
              <input
                type="text"
                placeholder="Task Title"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                required
              />
              <textarea
                placeholder="Description (optional)"
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
              ></textarea>
              <input
                type="date"
                value={newTaskDueDate}
                onChange={(e) => setNewTaskDueDate(e.target.value)}
              />
              <div className={styles.formActions}>
                {editingTask && (
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="button" onClick={handleCancelEdit} className={styles.cancelButton}>
                    Cancel
                  </motion.button>
                )}
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit" className={styles.submitButton}>
                  {editingTask ? 'Save Changes' : 'Add Task'}
                </motion.button>
              </div>
            </form>
          </section>

          <section className={styles.taskListSection}>
            <h2>{filter.charAt(0).toUpperCase() + filter.slice(1)} Tasks</h2>
            {loading ? (
              <p className={styles.noTasksMessage}>Loading tasks...</p>
            ) : (
              <div className={styles.taskListGrid}>
                <AnimatePresence>
                  {filteredTasks.length === 0 ? (
                    <motion.p
                      key="no-tasks"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={styles.noTasksMessage}
                    >
                      No {filter} tasks found.
                    </motion.p>
                  ) : (
                    filteredTasks.map(task => (
                      <motion.div
                        key={task.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className={`${styles.taskCard} ${task.status === 'completed' ? styles.completed : ''}`}
                      >
                        <h3>{task.title}</h3>
                        {task.description && <p className={styles.taskDescription}>{task.description}</p>}
                        {task.due_date && <p className={styles.taskDueDate}>Due: {task.due_date}</p>}
                        <div className={styles.taskCardActions}>
                          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleToggleComplete(task.id)} className={styles.completeButton}>
                            {task.status === 'completed' ? 'Uncomplete' : 'Complete'}
                          </motion.button>
                          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleEditTask(task)} className={styles.editButton}>
                            Edit
                          </motion.button>
                          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleDeleteTask(task.id)} className={styles.deleteButton}>
                            Delete
                          </motion.button>
                        </div>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
            )}
          </section>
        </main>
      </div>
    </motion.div>
  );
};

export default DashboardPage;

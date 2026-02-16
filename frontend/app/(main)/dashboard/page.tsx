"use client";

import React, { useState, useEffect } from 'react';
import styles from './dashboard.module.css';
import { motion, AnimatePresence } from 'framer-motion';

// Define the Task interface for type safety
interface Task {
  id: number;
  title: string;
  description?: string;
  status: 'pending' | 'completed';
  dueDate?: string; // Stored as 'YYYY-MM-DD'
  isMyDay: boolean;
}

// Function to get tasks from localStorage
const getTasksFromLocalStorage = (): Task[] => {
  if (typeof window !== 'undefined') {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
  }
  return [];
};

// Function to save tasks to localStorage
const saveTasksToLocalStorage = (tasks: Task[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
};

const DashboardPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed' | 'myday'>('all');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    // Load tasks from localStorage when the component mounts
    setTasks(getTasksFromLocalStorage());
  }, []);

  useEffect(() => {
    // Save tasks to localStorage whenever the tasks state changes
    saveTasksToLocalStorage(tasks);
  }, [tasks]);

  // Handle adding a new task
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: Date.now(), // Simple unique ID
      title: newTaskTitle,
      description: newTaskDescription.trim() || undefined,
      status: 'pending',
      dueDate: newTaskDueDate || undefined,
      isMyDay: false,
    };
    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
    setNewTaskDescription('');
    setNewTaskDueDate('');
  };

  // Handle deleting a task
  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Handle toggling task completion status
  const handleToggleComplete = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' } : task
    ));
  };

  // Handle toggling "Add to My Day" status
  const handleToggleMyDay = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, isMyDay: !task.isMyDay } : task
    ));
  };

  // Handle editing a task
  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setNewTaskTitle(task.title);
    setNewTaskDescription(task.description || '');
    setNewTaskDueDate(task.dueDate || '');
  };

  // Handle saving an edited task
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTask || !newTaskTitle.trim()) return;

    setTasks(tasks.map(task =>
      task.id === editingTask.id
        ? {
            ...task,
            title: newTaskTitle,
            description: newTaskDescription.trim() || undefined,
            dueDate: newTaskDueDate || undefined,
          }
        : task
    ));
    setEditingTask(null);
    setNewTaskTitle('');
    setNewTaskDescription('');
    setNewTaskDueDate('');
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
    if (filter === 'myday') return task.isMyDay;
    return true; // 'all' filter
  });

  return (
    <motion.div
      className={styles.dashboardPage}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <header className={styles.header}>
        <h1>My Personal Dashboard</h1>
        <p>Organize your tasks and boost productivity, saved locally.</p>
      </header>

      <div className={styles.contentWrapper}>
        <aside className={styles.sidebar}>
          <h2>Filters</h2>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setFilter('all')} className={filter === 'all' ? styles.activeFilter : ''}>All Tasks</motion.button>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setFilter('pending')} className={filter === 'pending' ? styles.activeFilter : ''}>Pending</motion.button>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setFilter('completed')} className={filter === 'completed' ? styles.activeFilter : ''}>Completed</motion.button>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setFilter('myday')} className={filter === 'myday' ? styles.activeFilter : ''}>My Day</motion.button>
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
                      className={`${styles.taskCard} ${task.status === 'completed' ? styles.completed : ''} ${task.isMyDay ? styles.myDayTask : ''}`}
                    >
                      <h3>{task.title}</h3>
                      {task.description && <p className={styles.taskDescription}>{task.description}</p>}
                      {task.dueDate && <p className={styles.taskDueDate}>Due: {task.dueDate}</p>}
                      <div className={styles.taskCardActions}>
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleToggleComplete(task.id)} className={styles.completeButton}>
                          {task.status === 'completed' ? 'Uncomplete' : 'Complete'}
                        </motion.button>
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleToggleMyDay(task.id)} className={styles.myDayButton}>
                          {task.isMyDay ? 'Remove from My Day' : 'Add to My Day'}
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
          </section>
        </main>
      </div>
    </motion.div>
  );
};

export default DashboardPage;

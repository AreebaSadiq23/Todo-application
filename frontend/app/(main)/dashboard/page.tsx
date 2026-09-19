"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import api from '@/lib/api';
import styles from './dashboard.module.css';
import { motion, AnimatePresence } from 'framer-motion';

// Types
interface Task {
  id: number;
  title: string;
  description?: string;
  status: 'pending' | 'completed';
  due_date?: string;
  my_day: boolean;
  list_id?: number;
  list_name?: string;
}

interface TaskList {
  id: number;
  name: string;
  description?: string;
  created_at: string;
  task_count?: number;
}

type FilterType = 'all' | 'pending' | 'completed' | 'my_day' | 'list';

const DashboardPage: React.FC = () => {
  // Task states
  const [tasks, setTasks] = useState<Task[]>([]);
  const [lists, setLists] = useState<TaskList[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [selectedListId, setSelectedListId] = useState<number | null>(null);
  
  // Form states
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');
  const [newTaskMyDay, setNewTaskMyDay] = useState(false);
  const [newTaskListId, setNewTaskListId] = useState<number | undefined>(undefined);
  const [newTaskPriority, setNewTaskPriority] = useState<'low' | 'medium' | 'high'>('medium');
  
  // Edit states
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [viewingTask, setViewingTask] = useState<Task | null>(null);
  
  // List states
  const [showCreateList, setShowCreateList] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [newListDescription, setNewListDescription] = useState('');
  
  // UI states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { isAuthenticated } = useAuth();
  const router = useRouter();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  // Fetch data
  const fetchData = async () => {
    try {
      setLoading(true);
      const [tasksRes, listsRes] = await Promise.all([
        api.get('/tasks/'),
        api.get('/tasks/lists')
      ]);
      setTasks(tasksRes.data);
      setLists(listsRes.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to fetch data');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  // Show success message temporarily
  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  // Add task
  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    try {
      const newTaskData = {
        title: newTaskTitle,
        description: newTaskDescription.trim() || undefined,
        due_date: newTaskDueDate || undefined,
        my_day: newTaskMyDay,
        list_id: newTaskListId,
        priority: newTaskPriority,
        status: 'pending',
      };
      const response = await api.post('/tasks/', newTaskData);
      setTasks([...tasks, response.data]);
      setNewTaskTitle('');
      setNewTaskDescription('');
      setNewTaskDueDate('');
      setNewTaskMyDay(false);
      setNewTaskListId(undefined);
      showSuccess('Task added successfully!');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to create task');
    }
  };

  // Delete task
  const handleDeleteTask = async (id: number) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
      showSuccess('Task deleted successfully!');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to delete task');
    }
  };

  // Toggle complete
  const handleToggleComplete = async (id: number) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    const newStatus = task.status === 'completed' ? 'pending' : 'completed';

    try {
      const response = await api.patch(`/tasks/${id}`, { status: newStatus });
      setTasks(tasks.map(t => t.id === id ? response.data : t));
      showSuccess(newStatus === 'completed' ? 'Task completed! 🎉' : 'Task marked as pending');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to update task');
    }
  };

  // Toggle My Day
  const handleToggleMyDay = async (id: number) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    try {
      const response = await api.patch(`/tasks/${id}`, { my_day: !task.my_day });
      setTasks(tasks.map(t => t.id === id ? response.data : t));
      showSuccess(response.data.my_day ? 'Added to My Day!' : 'Removed from My Day');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to update task');
    }
  };

  // Edit task
  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setViewingTask(null);
    setNewTaskTitle(task.title);
    setNewTaskDescription(task.description || '');
    setNewTaskDueDate(task.due_date || '');
    setNewTaskMyDay(task.my_day);
    setNewTaskListId(task.list_id);
  };

  // Save edited task
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTask || !newTaskTitle.trim()) return;

    try {
      const updatedTaskData = {
        title: newTaskTitle,
        description: newTaskDescription.trim() || undefined,
        due_date: newTaskDueDate || undefined,
        my_day: newTaskMyDay,
        list_id: newTaskListId,
        priority: newTaskPriority,
      };
      const response = await api.patch(`/tasks/${editingTask.id}`, updatedTaskData);
      setTasks(tasks.map(task => task.id === editingTask.id ? response.data : task));
      cancelEdit();
      showSuccess('Task updated successfully!');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to update task');
    }
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditingTask(null);
    setNewTaskTitle('');
    setNewTaskDescription('');
    setNewTaskDueDate('');
    setNewTaskMyDay(false);
    setNewTaskListId(undefined);
  };

  // Create list
  const handleCreateList = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newListName.trim()) return;

    try {
      const response = await api.post('/tasks/lists', {
        name: newListName,
        description: newListDescription.trim() || undefined,
      });
      setLists([...lists, response.data]);
      setNewListName('');
      setNewListDescription('');
      setShowCreateList(false);
      showSuccess('List created successfully!');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to create list');
    }
  };

  // Delete list
  const handleDeleteList = async (id: number) => {
    if (!confirm('Delete this list? Tasks in this list will not be deleted.')) return;

    try {
      await api.delete(`/tasks/lists/${id}`);
      setLists(lists.filter(l => l.id !== id));
      if (selectedListId === id) {
        setFilter('all');
        setSelectedListId(null);
      }
      showSuccess('List deleted successfully!');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to delete list');
    }
  };

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'completed'>('all');
  
  // Update filteredTasks logic
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' 
      ? true 
      : statusFilter === 'pending' 
        ? task.status === 'pending' 
        : task.status === 'completed';
    
    // Original filters
    let matchesOther = true;
    if (filter === 'my_day') matchesOther = task.my_day;
    if (filter === 'list' && selectedListId) matchesOther = task.list_id === selectedListId;
    
    return matchesSearch && matchesStatus && matchesOther;
  });

  // Get filter title
  const getFilterTitle = () => {
    if (filter === 'my_day') return 'My Day';
    if (filter === 'list' && selectedListId) {
      const list = lists.find(l => l.id === selectedListId);
      return list?.name || 'List';
    }
    return filter.charAt(0).toUpperCase() + filter.slice(1) + ' Tasks';
  };

  if (!isAuthenticated) {
    return null;
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
        <p>Organize your tasks, lists, and boost productivity.</p>
      </header>

      {error && (
        <div className={styles.errorMessage}>
          {error}
          <button onClick={() => setError(null)} className={styles.closeError}>×</button>
        </div>
      )}

      {successMessage && (
        <div className={styles.successMessage}>
          {successMessage}
        </div>
      )}

      <div className={styles.contentWrapper}>
        <aside className={styles.sidebar}>
          <h2>Navigation</h2>
          
          {/* Search and Filters */}
          <div className={styles.controls}>
            <input 
              type="text" 
              placeholder="Search tasks..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
            <div className={styles.filterButtons}>
              <button className={statusFilter === 'all' ? styles.activeFilter : ''} onClick={() => setStatusFilter('all')}>All</button>
              <button className={statusFilter === 'pending' ? styles.activeFilter : ''} onClick={() => setStatusFilter('pending')}>Active</button>
              <button className={statusFilter === 'completed' ? styles.activeFilter : ''} onClick={() => setStatusFilter('completed')}>Done</button>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { setFilter('pending'); setSelectedListId(null); }}
            className={filter === 'pending' ? styles.activeFilter : ''}
          >
            ⏳ Pending
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { setFilter('completed'); setSelectedListId(null); }}
            className={filter === 'completed' ? styles.activeFilter : ''}
          >
            ✅ Completed
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { setFilter('my_day'); setSelectedListId(null); }}
            className={filter === 'my_day' ? styles.activeFilter : ''}
          >
            ☀️ My Day
          </motion.button>

          <div className={styles.listsSection}>
            <div className={styles.listsHeader}>
              <h3>My Lists</h3>
              <button
                className={styles.createListBtn}
                onClick={() => setShowCreateList(!showCreateList)}
              >
                {showCreateList ? '×' : '+'}
              </button>
            </div>

            {showCreateList && (
              <form onSubmit={handleCreateList} className={styles.createListForm}>
                <input
                  type="text"
                  placeholder="List name"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Description (optional)"
                  value={newListDescription}
                  onChange={(e) => setNewListDescription(e.target.value)}
                />
                <button type="submit">Create</button>
              </form>
            )}

            <div className={styles.listsList}>
              {lists.map(list => (
                <div key={list.id} className={styles.listItem}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { setFilter('list'); setSelectedListId(list.id); }}
                    className={filter === 'list' && selectedListId === list.id ? styles.activeFilter : ''}
                  >
                    📁 {list.name}
                  </motion.button>
                  <button
                    className={styles.deleteListBtn}
                    onClick={() => handleDeleteList(list.id)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <main className={styles.mainContent}>
          <section className={styles.taskFormSection}>
            <h2>{editingTask ? '✏️ Edit Task' : '➕ Add New Task'}</h2>
            <form onSubmit={editingTask ? handleSaveEdit : handleAddTask} className={styles.taskForm}>
              <input
                className={styles.taskFormInput}
                type="text"
                placeholder="Task Title"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                required
              />
              <textarea
                className={styles.taskFormTextarea}
                placeholder="Description (optional)"
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
              ></textarea>
              <input
                className={styles.taskFormInput}
                type="date"
                value={newTaskDueDate}
                onChange={(e) => setNewTaskDueDate(e.target.value)}
              />
              
              <div className={styles.taskOptionsRow}>
                <label className={styles.myDayCheckboxContainer}>
                  <input
                    type="checkbox"
                    checked={newTaskMyDay}
                    onChange={(e) => setNewTaskMyDay(e.target.checked)}
                  />
                  <span>Add to My Day</span>
                </label>

                <select
                  className={styles.taskFormSelect}
                  value={newTaskPriority}
                  onChange={(e) => setNewTaskPriority(e.target.value as 'low' | 'medium' | 'high')}
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>

                <select
                  className={styles.taskFormSelect}
                  value={newTaskListId || ''}
                  onChange={(e) => setNewTaskListId(e.target.value ? Number(e.target.value) : undefined)}
                >
                  <option value="">No List</option>
                  {lists.map(list => (
                    <option key={list.id} value={list.id}>{list.name}</option>
                  ))}
                </select>
              </div>

              <div className={styles.formActionsContainer}>
                {editingTask && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={cancelEdit}
                    className={`${styles.actionButton} ${styles.cancelAction}`}
                  >
                    Cancel
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className={`${styles.actionButton} ${styles.submitAction}`}
                >
                  {editingTask ? '💾 Save Changes' : '➕ Add Task'}
                </motion.button>
              </div>
            </form>
          </section>

          <section className={styles.taskListSection}>
            <h2>{getFilterTitle()}</h2>
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
                      No tasks found.
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
                        <div className={styles.taskCardHeader}>
                          <h3>{task.title}</h3>
                          {task.my_day && <span className={styles.myDayBadge}>☀️ My Day</span>}
                        </div>
                        
                        {task.description && <p className={styles.taskDescription}>{task.description}</p>}
                        {task.due_date && <p className={styles.taskDueDate}>📅 Due: {task.due_date}</p>}
                        {task.list_name && <p className={styles.taskListBadge}>📁 {task.list_name}</p>}
                        
                        <div className={styles.taskCardActions}>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleToggleComplete(task.id)}
                            className={styles.completeButton}
                          >
                            {task.status === 'completed' ? '↩️ Undo' : '✅ Done'}
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setViewingTask(task)}
                            className={styles.viewButton}
                          >
                            👁️ View
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleToggleMyDay(task.id)}
                            className={styles.myDayButton}
                          >
                            {task.my_day ? '🌙 Remove' : '☀️ My Day'}
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleEditTask(task)}
                            className={styles.editButton}
                          >
                            ✏️ Edit
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDeleteTask(task.id)}
                            className={styles.deleteButton}
                          >
                            🗑️ Delete
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

      {/* View Task Modal */}
      <AnimatePresence>
        {viewingTask && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setViewingTask(null)}
          >
            <motion.div
              className={styles.modal}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className={styles.modalClose} onClick={() => setViewingTask(null)}>×</button>
              <h2>{viewingTask.title}</h2>
              <div className={styles.modalContent}>
                {viewingTask.description && <p><strong>Description:</strong> {viewingTask.description}</p>}
                <p><strong>Status:</strong> {viewingTask.status === 'completed' ? '✅ Completed' : '⏳ Pending'}</p>
                {viewingTask.due_date && <p><strong>Due Date:</strong> {viewingTask.due_date}</p>}
                <p><strong>My Day:</strong> {viewingTask.my_day ? '☀️ Yes' : '❌ No'}</p>
                {viewingTask.list_name && <p><strong>List:</strong> {viewingTask.list_name}</p>}
                <div className={styles.modalActions}>
                  <button onClick={() => { handleEditTask(viewingTask); }}>✏️ Edit</button>
                  <button onClick={() => handleToggleComplete(viewingTask.id)}>
                    {viewingTask.status === 'completed' ? '↩️ Mark Pending' : '✅ Mark Complete'}
                  </button>
                  <button className={styles.modalDeleteBtn} onClick={() => { handleDeleteTask(viewingTask.id); setViewingTask(null); }}>
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DashboardPage;

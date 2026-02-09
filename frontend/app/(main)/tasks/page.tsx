"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Task } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import styles from './tasks.module.css';

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onToggleComplete: (id: number, completed: boolean) => void;
}

const TaskItem = ({ task, onEdit, onDelete, onToggleComplete }: TaskItemProps) => {
  return (
    <div className={styles.taskItem}>
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={task.status === "completed"}
          onChange={() => onToggleComplete(task.id, task.status !== "completed")}
          className={styles.taskCheckbox}
        />
        <div>
          <h3 className={`${styles.taskTitle} ${task.status === "completed" ? styles.completed : ""}`}>
            {task.title}
          </h3>
          {task.description && (
            <p className={styles.taskDescription}>{task.description}</p>
          )}
          {task.due_date && (
            <p className={styles.taskDescription}>Due: {task.due_date.toString()}</p>
          )}
        </div>
      </div>
      <div className={styles.taskActions}>
        <Button onClick={() => onEdit(task)} className={styles.editButton}>
          Edit
        </Button>
        <Button onClick={() => onDelete(task.id)} className={styles.deleteButton}>
          Delete
        </Button>
      </div>
    </div>
  );
};

interface TaskFormProps {
  initialTask?: Task | null;
  onSave: () => void;
  onCancel: () => void;
}

const TaskForm = ({ initialTask, onSave, onCancel }: TaskFormProps) => {
  const [title, setTitle] = useState(initialTask?.title || "");
  const [description, setDescription] = useState(initialTask?.description || "");
  const [dueDate, setDueDate] = useState(initialTask?.due_date ? new Date(initialTask.due_date).toISOString().split('T')[0] : "");
  const [status, setStatus] = useState(initialTask?.status || "pending");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setDescription(initialTask.description || "");
      setDueDate(initialTask.due_date ? new Date(initialTask.due_date).toISOString().split('T')[0] : "");
      setStatus(initialTask.status);
    } else {
      setTitle("");
      setDescription("");
      setDueDate("");
      setStatus("pending");
    }
  }, [initialTask]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const taskData = {
        title,
        description,
        due_date: dueDate || undefined,
        status,
      };

      if (initialTask) {
        await api.patch(`/tasks/${initialTask.id}`, taskData);
      } else {
        await api.post("/tasks/", taskData);
      }
      onSave();
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to save task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={styles.taskFormCard}>
      <CardHeader>
        <CardTitle>{initialTask ? "Edit Task" : "Create New Task"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className={styles.formGroup}>
            <Label htmlFor="title" className={styles.label}>Title</Label>
                          <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className={styles.input}
                          />          </div>
          <div className={styles.formGroup}>
            <Label htmlFor="description" className={styles.label}>Description</Label>
                          <Input
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className={styles.input}
                          />          </div>
          <div className={styles.formGroup}>
            <Label htmlFor="dueDate" className={styles.label}>Due Date</Label>
                          <Input
                            id="dueDate"
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className={styles.input}
                          />          </div>
          <div className={styles.formGroup}>
            <Label htmlFor="status" className={styles.label}>Status</Label>
                          <select
                            id="status"
                            value={status}
                            onChange={(e) => {
                              const newStatus = e.target.value;
                              if (newStatus === "pending" || newStatus === "completed") {
                                setStatus(newStatus);
                              }
                            }}
                            className={styles.input}            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          {error && <p className={styles.errorText}>{error}</p>}
          <div className={styles.formActionButtons}>
            <Button type="button" onClick={onCancel} className={styles.buttonOutline}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className={styles.saveButton}>
              {loading ? "Saving..." : "Save Task"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await api.get("/tasks/");
      setTasks(response.data);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSaveTask = () => {
    setEditingTask(null);
    fetchTasks();
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleDeleteTask = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await api.delete(`/tasks/${id}`);
        fetchTasks();
      } catch (err: any) {
        setError(err.response?.data?.detail || "Failed to delete task");
      }
    }
  };

  const handleToggleComplete = async (id: number, completed: boolean) => {
    try {
      await api.patch(`/tasks/${id}`, { status: completed ? "completed" : "pending" });
      fetchTasks();
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to update task status");
    }
  };

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p className={styles.errorText}>Error: {error}</p>;

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.taskListColumn}>
        <div className={styles.headerSection}>
          <h1 className={styles.headerTitle}>Your Tasks</h1>
        </div>

        {tasks.length === 0 ? (
          <div className={styles.emptyState}>
            <h2>No tasks yet</h2>
            <p>Add a new task to get started!</p>
          </div>
        ) : (
          <div className={styles.taskList}>
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onToggleComplete={handleToggleComplete}
              />
            ))}
          </div>
        )}
      </div>

      <div className={styles.taskFormColumn}>
        <TaskForm initialTask={editingTask} onSave={handleSaveTask} onCancel={() => setEditingTask(null)} />
      </div>
    </div>
  );
}
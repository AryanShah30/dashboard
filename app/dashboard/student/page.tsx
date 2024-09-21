"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../globals.css'; // Import global styles

interface Task {
  _id: string;
  taskName: string;
  taskDescription: string;
  preferredTime: string;
  studentId: string;
  studentName: string;
  studentRoom: string;
}

const StudentDashboard = () => {
  const [pendingTasks, setPendingTasks] = useState<Task[]>([]);
  const [assignedTasks, setAssignedTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<Task>({
    _id: '', // This is just for TypeScript to recognize the type; you won't need this field for new tasks
    taskName: '',
    taskDescription: '',
    preferredTime: '',
    studentId: '',
    studentName: '',
    studentRoom: '',
  });

  useEffect(() => {
    const fetchTasks = async () => {
      const resPending = await axios.get<Task[]>('/api/tasks/pending');
      const resAssigned = await axios.get<Task[]>('/api/tasks/assigned');
      setPendingTasks(resPending.data);
      setAssignedTasks(resAssigned.data);
    };

    fetchTasks();
  }, []);

  const handleSubmitTask = async (taskData: Task) => {
    await axios.post('/api/tasks/create', taskData);
    // Optionally fetch tasks again or update state
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmitTask(newTask);
    setNewTask({ _id: '', taskName: '', taskDescription: '', preferredTime: '', studentId: '', studentName: '', studentRoom: '' });
  };

  return (
    <div className="container">
      <h1>Student Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="taskName"
          value={newTask.taskName}
          onChange={handleChange}
          placeholder="Task Name"
          required
        />
        <textarea
          name="taskDescription"
          value={newTask.taskDescription}
          onChange={handleChange}
          placeholder="Task Description"
          required
        />
        <input
          type="datetime-local"
          name="preferredTime"
          value={newTask.preferredTime}
          onChange={handleChange}
          required
        />
        <input
          name="studentId"
          value={newTask.studentId}
          onChange={handleChange}
          placeholder="Your Student ID"
          required
        />
        <input
          name="studentName"
          value={newTask.studentName}
          onChange={handleChange}
          placeholder="Your Name"
          required
        />
        <input
          name="studentRoom"
          value={newTask.studentRoom}
          onChange={handleChange}
          placeholder="Your Room"
          required
        />
        <button type="submit">Submit Task</button>
      </form>
      <h2>Pending Tasks</h2>
      <ul>
        {pendingTasks.map((task) => (
          <li key={task._id}>
            <h3>{task.taskName}</h3>
            <p>{task.taskDescription}</p>
            <p>Room: {task.studentRoom}</p>
            <p>Preferred Time: {new Date(task.preferredTime).toLocaleString()}</p>
          </li>
        ))}
      </ul>
      <h2>Assigned Tasks</h2>
      <ul>
        {assignedTasks.map((task) => (
          <li key={task._id}>
            <h3>{task.taskName}</h3>
            <p>{task.taskDescription}</p>
            <p>Room: {task.studentRoom}</p>
            <p>Preferred Time: {new Date(task.preferredTime).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentDashboard;
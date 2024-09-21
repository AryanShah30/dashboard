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

const WardenDashboard = () => {
  const [pendingTasks, setPendingTasks] = useState<Task[]>([]);
  const [assignedTasks, setAssignedTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const resPending = await axios.get<Task[]>('/api/tasks/pending');
      const resAssigned = await axios.get<Task[]>('/api/tasks/assigned');
      setPendingTasks(resPending.data);
      setAssignedTasks(resAssigned.data);
    };

    fetchTasks();
  }, []);

  const handleAssignTask = async (taskId: string, workerId: string, newTime: string) => {
    await axios.post('/api/tasks/assign', { taskId, workerId, newTime });
    // Fetch tasks again or update state
  };

  return (
    <div className="container">
      <h1>Warden Dashboard</h1>
      <h2>Pending Tasks</h2>
      <ul>
        {pendingTasks.map((task) => (
          <li key={task._id}>
            <h3>{task.taskName}</h3>
            <p>{task.taskDescription}</p>
            <p>Room: {task.studentRoom}</p>
            <p>Preferred Time: {new Date(task.preferredTime).toLocaleString()}</p>
            {/* Add logic for assigning tasks, e.g., a dropdown for available workers */}
            <button onClick={() => handleAssignTask(task._id, 'workerId', 'newTime')}>Assign Task</button>
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

export default WardenDashboard;
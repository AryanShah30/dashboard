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

const WorkerDashboard = () => {
  const [assignedTasks, setAssignedTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await axios.get<Task[]>('/api/tasks/assigned');
      setAssignedTasks(res.data);
    };

    fetchTasks();
  }, []);

  const handleCompleteTask = async (taskId: string) => {
    await axios.post('/api/tasks/complete', { taskId });
    // Fetch tasks again or update state
  };

  return (
    <div className="container">
      <h1>Worker Dashboard</h1>
      <ul>
        {assignedTasks.map((task) => (
          <li key={task._id}>
            <h3>{task.taskName}</h3>
            <p>{task.taskDescription}</p>
            <p>Room: {task.studentRoom}</p>
            <p>Preferred Time: {new Date(task.preferredTime).toLocaleString()}</p>
            <button onClick={() => handleCompleteTask(task._id)}>Mark as Completed</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkerDashboard;
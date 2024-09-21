import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import Task from '@/models/Task';
import Worker from '@/models/Worker';

export async function POST(req: Request) {
  await dbConnect();
  const { taskId, workerId, newTime } = await req.json();

  try {
    const task = await Task.findById(taskId);
    const worker = await Worker.findById(workerId);
    
    task.assignedTo = worker._id;
    task.preferredTime = newTime || task.preferredTime;
    task.wardenAssigned = true;
    task.status = 'Assigned';
    
    await task.save();
    
    worker.assignedTasks.push(task._id);
    await worker.save();
    
    return NextResponse.json({ success: true, task }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }
}

import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import Task from '@/models/Task';

export async function POST(req: Request) {
  await dbConnect();
  const { taskName, taskDescription, preferredTime, studentId, studentName, studentRoom } = await req.json();

  const newTask = new Task({
    taskName,
    taskDescription,
    preferredTime,
    studentId,
    studentName,
    studentRoom,
    wardenAssigned: false,
  });

  try {
    await newTask.save();
    return NextResponse.json({ success: true, task: newTask }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }
}

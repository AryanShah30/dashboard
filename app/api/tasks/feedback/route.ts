import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import Task from '@/models/Task';

export async function POST(req: Request) {
  await dbConnect();
  const { taskId, stars, message } = await req.json();

  try {
    const task = await Task.findById(taskId);
    task.feedback = { stars, message };
    await task.save();

    return NextResponse.json({ success: true, task }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }
}

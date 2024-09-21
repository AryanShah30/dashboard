import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import Task from '@/models/Task';

export async function POST(req: Request) {
  await dbConnect();
  const { taskId } = await req.json();

  try {
    const task = await Task.findById(taskId);
    task.status = 'Completed';
    await task.save();

    return NextResponse.json({ success: true, task }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }
}

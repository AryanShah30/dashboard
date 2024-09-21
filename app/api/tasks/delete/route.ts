import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import Task from '@/models/Task';

export async function DELETE(req: Request) {
  await dbConnect();
  const { taskId } = await req.json();

  try {
    await Task.findByIdAndDelete(taskId);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }
}

import { NextResponse } from 'next/server';
import { TaskService } from '@/lib/task-service';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    const tasks = await TaskService.getTasksForUser(userId);
    return NextResponse.json(tasks);
  } catch (error: any) {
    console.error('Error in GET /api/tasks:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { userId, text, priority } = await request.json();

  if (!userId || !text || !priority) {
    return NextResponse.json({ error: 'User ID, text, and priority are required' }, { status: 400 });
  }

  try {
    const task = await TaskService.addTask(userId, text, priority);
    return NextResponse.json(task);
  } catch (error: any) {
    console.error('Error in POST /api/tasks:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const { id, updates } = await request.json();

  if (!id || !updates) {
    return NextResponse.json({ error: 'Task ID and updates are required' }, { status: 400 });
  }

  try {
    const updatedTask = await TaskService.updateTask(id, updates);
    return NextResponse.json(updatedTask);
  } catch (error: any) {
    console.error('Error in PUT /api/tasks:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Task ID is required' }, { status: 400 });
  }

  try {
    await TaskService.deleteTask(id);
    return NextResponse.json({ message: 'Task deleted successfully' });
  } catch (error: any) {
    console.error('Error in DELETE /api/tasks:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
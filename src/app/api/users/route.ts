import { NextResponse } from 'next/server';
import { UserService } from '@/lib/user-service';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  try {
    const user = await UserService.getOrCreateUser(email);
    return NextResponse.json(user);
  } catch (error: any) {
    console.error('Error in GET /api/users:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  try {
    const user = await UserService.getOrCreateUser(email);
    return NextResponse.json(user);
  } catch (error: any) {
    console.error('Error in POST /api/users:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
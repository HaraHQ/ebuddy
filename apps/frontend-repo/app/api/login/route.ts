// src/app/api/login/route.js
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  // Call the external login API
  const response = await fetch('http://localhost:3883/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (response.ok) {
    const { token } = await response.json();

    // Set the token in an HTTP-only cookie
    const res = NextResponse.json({ success: true });
    res.cookies.set('token', token, {
      httpOnly: true,
      secure: false,
      path: '/',
    });

    return res;
  }

  return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
}

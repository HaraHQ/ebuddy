import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set('token', '', { maxAge: 0 }); // Clear the token
  return response;
}
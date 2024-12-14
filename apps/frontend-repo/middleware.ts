// src/middleware.js
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    // Redirect unauthenticated users to the login page
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    // Optionally validate the JWT token
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    jwt.verify(token, process.env.JWT_SECRET as string); // Replace with your secret
    return NextResponse.next();
  } catch {
    // If invalid, redirect to login
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/protected/:path*'], // Only protect certain routes
};

export default middleware;
// src/app/page.js
import { cookies } from 'next/headers';
import LogoutButton from '../components/LogoutButton';
import UserTable from '../components/UserTable';
import { Typography } from '@mui/material';

export default async function HomePage() {
  // Get the cookies object
  const cookieStore = await cookies();

  // Retrieve the token from the cookies
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return (
      <div>
        <Typography variant='h3'>You are not logged in.</Typography>
        <Typography variant='h5'>
          <a href="/login">Go to Login</a>
        </Typography>
      </div>
    );
  }

  return (
    <div>
      <UserTable token={token} />
      <LogoutButton />
    </div>
  );
}

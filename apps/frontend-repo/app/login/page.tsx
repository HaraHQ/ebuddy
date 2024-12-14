// src/app/login/page.js
'use client';

import { Box, Button, FormControl, TextField, Typography } from '@mui/material';
import { FormEvent, useState } from 'react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      // Redirect to the protected page
      window.location.href = '/';
    } else {
      const { message } = await response.json();
      setError(message || 'Login failed');
    }
  };

  return (
    <Box>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Typography variant='h3'>You are not logged in.</Typography>
        <FormControl>
          <TextField id="username" label="Username" variant="outlined"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <TextField id="password" label="Password" variant="outlined"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <Button variant='contained' color='primary' type='submit'>Login</Button>
        </FormControl>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </Box>
  );
}

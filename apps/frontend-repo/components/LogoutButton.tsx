"use client";

import { Button } from "@mui/material";

const LogoutButton = () => {
  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    window.location.href = '/login';
  };

  return (
    <Button variant="contained" color="error" onClick={() => handleLogout()}>
      Logout
    </Button>
  )
}

export default LogoutButton;
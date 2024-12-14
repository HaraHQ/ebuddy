'use client';

import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from "../store/userSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  Modal,
  TextField,
  Box,
} from '@mui/material';
import { AppDispatch, RootState } from '../store';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface User {
  u: string;
  p?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface UserTableProps {
  token: string;
}

const UserTable: FC<UserTableProps> = ({ token }) => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.users.users);
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [messageModal, setMessageModal] = useState({ open: false, message: '' });

  useEffect(() => {
    dispatch(fetchUserData(token));
  }, [dispatch]);

  const handleOpenModal = (user: User | null = null) => {
    setSelectedUser(user);
    setFormData(user ? { username: user.u, password: '' } : { username: '', password: '' });
    setOpenModal(true);
  };

  const handleCloseModal = () => setOpenModal(false);

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    console.log('token', token)
    try {
      // Retrieve token from cookies
      if (!token) {
        console.error('Token not found');
        return; // Exit if token is not found
      }
  
      const response = await fetch('http://localhost:3883/users/update-user-data', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
      setMessageModal({ open: true, message: result.message });
      dispatch(fetchUserData(token)); // Refresh table data
      handleCloseModal();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <Box>
      <Button variant="contained" onClick={() => handleOpenModal()}>
        Create User
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Updated At</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user: User, index) => (
              <TableRow key={index}>
                <TableCell>{user.u}</TableCell>
                <TableCell>{new Date(user?.createdAt || 0).toLocaleString()}</TableCell>
                <TableCell>{new Date(user?.updatedAt || 0) .toLocaleString()}</TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => handleOpenModal(user)}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Form Modal */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={style}>
          <Typography variant="h6">{selectedUser ? 'Edit User' : 'Create User'}</Typography>
          <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            disabled={!!selectedUser}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Update
            </Button>
            <Button variant="outlined" onClick={handleCloseModal}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Message Modal */}
      <Modal open={messageModal.open} onClose={() => setMessageModal({ open: false, message: '' })}>
        <Box sx={style}>
          <Typography variant="h6">{messageModal.message}</Typography>
          <Button onClick={() => setMessageModal({ open: false, message: '' })}>Close</Button>
        </Box>
      </Modal>
    </Box>
  );
}

export default UserTable;
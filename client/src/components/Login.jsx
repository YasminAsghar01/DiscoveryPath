import * as React from 'react';
import { LockOutlined } from '@mui/icons-material';
import { Avatar, Button, TextField, Paper, Box, Grid } from '@mui/material';

export default function Login() {
  // creates a POST request with users email and password to authenticate user
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const credentials = {
      email: data.get('email'),
      password: data.get('password'),
    };
    try {
      const url = "http://localhost:3001/login";
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      if (!response.ok) {
        throw new Error('Login failed');
      }
      const { data: token } = await response.json();
      localStorage.setItem("token", token);
      window.location = "/";
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

 // Contains textfield for user to input email addresss and password, when saved this calls handleSubmit()
  return (
    <Grid>
      <Paper elevation={10} style={{ padding: 40, height: '100%', width: '30%', margin: "15vh auto" }}>
        <Grid align='center'>
          <Avatar style={{ backgroundColor: '#2D5592' }}><LockOutlined /></Avatar>
          <h2>Log in</h2>
        </Grid>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <Button
          className='login'
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 25, mb: 15 }}
        >
          Log In
        </Button>
        </Box>
      </Paper>
    </Grid>
  );
}

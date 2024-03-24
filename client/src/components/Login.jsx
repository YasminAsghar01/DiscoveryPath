import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { LockOutlined } from '@mui/icons-material';
import { Avatar } from '@mui/material';

export default function Login() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const credentials = {
      email: data.get('email'),
      password: data.get('password'),
    };
    console.log(JSON.stringify(credentials))
    try {
      const url = "http://localhost:3001/login";
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),

      });
      console.log(response)
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

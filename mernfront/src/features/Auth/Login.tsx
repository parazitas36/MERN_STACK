import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Stack, Button, Typography, Avatar } from '@mui/material'
import { LoginData } from './LoginData';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Login = () => {
  const [loginData, setLoginData] = useState<LoginData>({
    username: '',
    password: '',
  });

	return (
		<form style={{ padding: '10px', backgroundColor: 'inherit' }}>
      <Stack spacing={2}>
        <Avatar sx={{ padding: 0, backgroundColor: 'inherit', alignSelf: 'center' }}>
          <AccountCircleIcon color='disabled' sx={{ height: '100%', width: '100%' }} />
        </Avatar>
        <Typography variant='h4' sx={{ textAlign: 'center' }}>
          Sign In
        </Typography>
				<TextField
					id=""
					label="Username"
					value={loginData.username}
          onChange={(el) => setLoginData({...loginData, username: el.target.value })}
					fullWidth
					required
				/>
				<TextField
					id=""
					label="Password"
					value={loginData.password}
          onChange={(el) => setLoginData({...loginData, password: el.target.value })}
					required
          type='password'
					fullWidth
				/>
        <Button variant="contained" color="primary" type='submit' size='large'>
          <Typography variant='button' color="text">
            Login
          </Typography>
        </Button>
      </Stack>
		</form>
	);
};

export default Login;

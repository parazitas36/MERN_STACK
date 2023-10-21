import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Stack, Button, Typography, Container, InputAdornment, IconButton, OutlinedInput, InputLabel, FormControl, FormLabel, FormHelperText } from '@mui/material';
import Logo from './Logo';
import { IUserPostDto } from '../../data/DTOs/user/UserPostDto';
import { Role } from '../../data/enums/Role';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Register = () => {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [registerData, setRegisterData] = useState<IUserPostDto>({
		email: '',
		name: '',
		password: '',
		role: Role.Regular,
		surname: '',
		repeatPassword: '',
	});

	const onClickShowHidePassword = () => {
		setShowPassword(val => !val);
	}

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	return (
		<Container
			maxWidth="xs"
			sx={{ backgroundColor: 'background.paper', py: 2 }}
		>
			<form
				onSubmit={onSubmit}
				style={{ padding: '10px' }}
			>
				<Stack spacing={2}>
					<Logo />
					<Stack direction="row" spacing={2}>
						<TextField
							id="register-name"
							label="Name"
							placeholder="Name"
							type="text"
							value={registerData.name}
							onChange={(el) => setRegisterData({ ...registerData, name: el.target.value })}
							required
							size="medium"
						/>
						<TextField
							id="register-surname"
							label="Surname"
							placeholder="Surname"
							value={registerData.surname}
							onChange={(el) => setRegisterData({ ...registerData, surname: el.target.value })}
							required
							type="text"
							size="medium"
						/>
					</Stack>
					<TextField
						id="register-email"
						label="Email"
						placeholder="Email"
						type="email"
						value={registerData.email}
						onChange={(el) => setRegisterData({ ...registerData, email: el.target.value })}
						fullWidth
						required
						size="medium"
					/>
					<FormControl>
						<InputLabel htmlFor="register-password">Password *</InputLabel>
						<OutlinedInput
							id="register-password"
							label="Password"
							placeholder="Password"
							value={registerData.password}
							onChange={(el) => setRegisterData({ ...registerData, password: el.target.value })}
							required
							type={showPassword ? "text" : "password"}
							fullWidth
							size="medium"
							endAdornment={
								<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={onClickShowHidePassword}
									edge="end"
								>
									{showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
								</InputAdornment>
							}
						/>
					</FormControl>
					<TextField
						id="register-rpassword"
						label="Repeat password"
						value={registerData.repeatPassword}
						onChange={(el) => setRegisterData({ ...registerData, repeatPassword: el.target.value })}
						required
						type="password"
						fullWidth
						size="medium"
					/>
					<Button
						variant="contained"
						color="primary"
						type="submit"
						size="large"
					>
						<Typography
							variant="button"
							color="text"
						>
							Register
						</Typography>
					</Button>
				</Stack>
			</form>
		</Container>
	);
};

export default Register;

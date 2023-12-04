import React, { useState, useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import {
	Stack,
	Button,
	Typography,
	Container,
	InputAdornment,
	IconButton,
	OutlinedInput,
	InputLabel,
	FormControl,
	FormHelperText,
	Alert,
	Snackbar,
	AlertColor,
} from '@mui/material';
import Logo from './Logo';
import { IUserPostDto } from '../../data/DTOs/user/UserPostDto';
import { Role } from '../../data/enums/Role';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Emit } from '../../helpers/EventHandler';
import { Events } from '../../helpers/Events';

interface RegisterDataValidationErrors {
	NameError: string | undefined;
	SurnameError: string | undefined;
	EmailError: string | undefined;
	PasswordError: string | undefined;
	RepeatPasswordError: string | undefined;
}

interface NotificationOptions {
	message: string;
	severity: AlertColor | undefined;
}

const Register = () => {
	const ref = useRef(null);
	const [notification, setNotification] = useState<NotificationOptions>({
		message: '',
		severity: undefined,
	});
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [validation, setValidation] = useState<RegisterDataValidationErrors | null>(null);
	const [registerData, setRegisterData] = useState<IUserPostDto>({
		email: '',
		name: '',
		password: '',
		role: Role.Regular,
		surname: '',
		repeatPassword: '',
	});

	const onClickShowHidePassword = () => {
		setShowPassword((val) => !val);
	};

	useEffect(() => {
		setValidation({
			NameError: undefined,
			SurnameError: undefined,
			EmailError: undefined,
			PasswordError: registerData.password.length >= 6 || registerData.password.length === 0 ? undefined : '',
			RepeatPasswordError:
				registerData.repeatPassword.length === 0 || registerData.password === registerData.repeatPassword
					? undefined
					: 'Passwords must match.',
		});
	}, [registerData]);

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const invalidField = Object.values(validation!).find((x) => x !== undefined);
		if (invalidField !== undefined) {
			setNotification({
				message: 'Entered data is invalid!',
				severity: 'error'
			})
			return;
		}

		setNotification({
			message: 'Registration was successful!',
			severity: 'success'
		});

		Emit(Events.SwitchTabToSignIn);
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
					<Stack
						direction="row"
						spacing={2}
					>
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
					<FormControl error={validation?.PasswordError !== undefined}>
						<InputLabel htmlFor="register-password">Password *</InputLabel>
						<OutlinedInput
							id="register-password"
							label="Password"
							placeholder="Password"
							value={registerData.password}
							onChange={(el) => setRegisterData({ ...registerData, password: el.target.value })}
							required
							type={showPassword ? 'text' : 'password'}
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
						{validation?.PasswordError !== undefined && (
							<FormHelperText>Password must be at least 6 characters long.</FormHelperText>
						)}
					</FormControl>
					<TextField
						id="register-rpassword"
						label="Repeat password"
						error={validation?.RepeatPasswordError !== undefined}
						helperText={validation?.RepeatPasswordError}
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
					<Snackbar
						open={(notification?.message.length ?? 0) > 0}
						onClose={() => setNotification({...notification, message: ""})}
						autoHideDuration={2000}
						anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
					>
						<Alert
							severity={notification?.severity}
							sx={{ width: '100%', marginBottom: { xs: 7, sm: 6 } }}
							variant='filled'
						>
							{notification?.message}
						</Alert>
					</Snackbar>
				</Stack>
			</form>
		</Container>
	);
};

export default Register;

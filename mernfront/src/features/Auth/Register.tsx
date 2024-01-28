import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import Logo from './Logo';
import { IUserPostDto } from '../../data/DTOs/user/UserPostDto';
import { Role } from '../../data/enums/Role';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Emit } from '../../helpers/EventHandler';
import { Events } from '../../helpers/Events';
import { NotificationOptions } from './index'
import { usePost } from '../../hooks/usePost';
import { UserEndpoints } from '../../api/endpoints/UserEndpoints';
import { StatusCodes } from '../../data/enums/StatusCodes';

interface RegisterDataValidationErrors {
	NameError: string | undefined;
	SurnameError: string | undefined;
	EmailError: string | undefined;
	PasswordError: string | undefined;
	RepeatPasswordError: string | undefined;
}

interface Props {
	notification: NotificationOptions,
	setNotification: React.Dispatch<React.SetStateAction<NotificationOptions>>
}

const Register: React.FC<Props> = (props: Props) => {
	const postCall = usePost<IUserPostDto, any>({
		endpoint: UserEndpoints.Register,
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

	const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const invalidField = Object.values(validation!).find((x) => x !== undefined);
		if (invalidField !== undefined) {
			ShowInvalidDataNotification();
			return;
		}

		await postCall.PostData(registerData);

		if (postCall.statusCode.current !== StatusCodes.CREATED) {
			ShowFailedNotification();
			return;
		}

		ShowSuccessNotification();
		Emit(Events.SwitchTabToSignIn);
	};

	const ShowSuccessNotification = () => {
		props.setNotification({
			message: 'Registration was successful!',
			severity: 'success'
		});
	}

	const ShowFailedNotification = () => {
		props.setNotification({
			message: 'Registration failed, please try again!',
			severity: 'error'
		});
	}

	const ShowInvalidDataNotification = () => {
		props.setNotification({
			message: 'Entered data is invalid!',
			severity: 'error'
		})
	}

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
				</Stack>
			</form>
		</Container>
	);
};

export default Register;

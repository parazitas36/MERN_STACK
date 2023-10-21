import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Stack, Button, Typography, Container } from '@mui/material';
import { IUserLoginDto } from '../../data/DTOs/user/IUserLoginDto';
import Logo from './Logo';
import { useNavigate } from 'react-router-dom';
import { Emit } from '../../helpers/EventHandler';
import { Events } from '../../helpers/Events';

interface Props {
	isInPopper?: boolean;
}

const Login = (props: Props) => {
	const [loginData, setLoginData] = useState<IUserLoginDto>({
		email: '',
		password: '',
	});

	const navigation = useNavigate();

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	const navigateToAuthPage = () => {
		Emit(Events.ClosePoppers);
		navigation('auth/register');
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
					<TextField
						id="login-email"
						label="Email"
						type="email"
						value={loginData.email}
						onChange={(el) => setLoginData({ ...loginData, email: el.target.value })}
						fullWidth
						required
						size={props.isInPopper === true ? 'small' : 'medium'}
					/>
					<TextField
						id="login-password"
						label="Password"
						value={loginData.password}
						onChange={(el) => setLoginData({ ...loginData, password: el.target.value })}
						required
						type="password"
						fullWidth
						size={props.isInPopper === true ? 'small' : 'medium'}
					/>
					<Button
						variant="contained"
						color="primary"
						type="submit"
						size={props.isInPopper === true ? 'medium' : 'large'}
					>
						<Typography
							variant="button"
							color="text"
						>
							Login
						</Typography>
					</Button>
					{props.isInPopper === true && (
						<Button
							variant="outlined"
							color="primary"
							type="button"
							size="medium"
							onClick={navigateToAuthPage}
						>
							<Typography
								variant="button"
								color="text"
							>
								Register
							</Typography>
						</Button>
					)}
				</Stack>
			</form>
		</Container>
	);
};

export default Login;

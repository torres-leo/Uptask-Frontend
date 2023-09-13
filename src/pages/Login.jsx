import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faLock } from '@fortawesome/free-solid-svg-icons';

import FormikForm from '../components/FormikForm/Index';
import Input from '../components/Input/Index';
import InputFormik from '../components/InputFormik/Index';
import useNavigateTo from '../hooks/useNavigation';
import useDocumentTitle from '../hooks/useDocumentTitle';
('../hooks/useDocumentTitle');
import axiosInstance from '../config/axios';
import Message from '../components/InputFormik/Message';
import { SwalAlert } from '../components/helpers/SwalAlert';
import useAuth from '../hooks/useAuth';

const Login = () => {
	const [showPassword, setShowPassword] = useState(false);
	useDocumentTitle('UpTask - Sign In');
	const navigateTo = useNavigateTo();
	const { setAuth } = useAuth();

	const schema = Yup.object({
		email: Yup.string().required('*Email is required').email('*Must be a valid email'),
		password: Yup.string().required('*Password is required'),
	});

	const initialValues = {
		email: '',
		password: '',
	};

	const settings = {
		icon: '',
		title: '',
		text: '',
		preConfirm: null,
	};

	const handleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleSubmit = async (values) => {
		try {
			const { data } = await axiosInstance.post('/users/login', values);
			localStorage.setItem('uptask_token', data.user.token);
			setAuth(data.user.token);
			navigateTo('/projects');
		} catch (error) {
			settings.icon = 'error';
			settings.title = 'Oops...';
			settings.text = error.response.data.msg ?? error.message;

			SwalAlert(settings, false);
		}
	};

	return (
		<div id='Login'>
			<h1 className='title-heading'>
				<span className='subtitle-b-b'>Sign In</span>
			</h1>
			<div className='mt-10 border rounded-md px-4 py-5'>
				<FormikForm initialValues={initialValues} schema={schema} onSubmit={handleSubmit}>
					<div className='Login-group'>
						<label htmlFor='email' className='Login-label'>
							Email
						</label>
						<InputFormik id='email' name='email' placeholder='example@example.com' type='email' />
						<Message name='email' />
					</div>

					<div className='Login-group'>
						<label htmlFor='password' className='Login-label'>
							Password
						</label>
						<div className='relative flex justify-between'>
							<InputFormik
								id='password'
								name='password'
								placeholder='*******'
								type={showPassword ? 'text' : 'password'}
							/>
							<FontAwesomeIcon
								// className='Formik-password icon'
								className={`Formik-password icon transition-opacity `}
								onClick={handleShowPassword}
								icon={showPassword ? faEye : faEyeSlash}
							/>
						</div>
					</div>

					<Input type='submit' value='Log In' customClass='Login-submit' />
				</FormikForm>
			</div>

			<nav className='lg:flex lg:justify-between'>
				{/* <Link className='Login-link' to='signup'> */}
				<Link className='Login-link' onClick={() => navigateTo('signup')}>
					You do not have an account? <span className='underline underline-offset-4'>Sign up!</span>
				</Link>
				{/* <Link className='Login-link' to='reset-password'> */}
				<Link className='Login-link' onClick={() => navigateTo('reset-password')}>
					Forget my password <FontAwesomeIcon icon={faLock} />
				</Link>
			</nav>
		</div>
	);
};

export default Login;

import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import FormikForm from '../components/FormikForm/Index';
import InputFormik from '../components/InputFormik/Index';
import * as Yup from 'yup';
import Input from '../components/Input/Index';
import { useState } from 'react';
import Message from '../components/InputFormik/Message';
import axiosInstance from '../config/axios';
import { pages } from '../helpers/Links';
import { SwalAlert } from '../helpers/SwalAlert';
import useNavigateTo from '../hooks/useNavigation';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { flushSync } from 'react-dom';
('../hooks/useDocumentTitle');

const Signup = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [showCNPassword, setShowCNPassword] = useState(false);
	useDocumentTitle('UpTask - Sign Up');

	const navigate = useNavigate();
	const navigateTo = useNavigateTo();

	const schema = Yup.object({
		username: Yup.string().required('*Name is required').max(50, 'Limit has been reached(50)'),
		email: Yup.string().required('*Email is required').email('Provide a valid email'),
		password: Yup.string()
			.required('*Password is required')
			.min(6, 'Must contain at least 6 characters')
			.max(20, 'Limit has been reached(20)'),
		cnpassword: Yup.string().when('password', (password, field) =>
			password ? field.required('*Required Field').oneOf([Yup.ref('password')], '*Passwords no matches') : field
		),
	});

	const initialValues = {
		username: '',
		email: '',
		password: '',
		cnpassword: '',
	};

	const handleSubmit = async (values, { resetForm }) => {
		const { username, email, password } = values;

		const settings = {
			icon: '',
			title: '',
			text: '',
			preConfirm: null,
		};

		try {
			const response = await axiosInstance.post('/users', { name: username, email, password });
			const {
				data: { msg },
			} = response;

			settings.icon = 'success';
			settings.text = `${msg}. Check your email to verify your account.`;
			settings.preConfirm = () => {
				flushSync(() => {
					navigate(pages.login);
				});
				resetForm({ values: '' });
			};

			SwalAlert(settings);
		} catch (error) {
			settings.icon = 'error';
			settings.title = 'Oops...';
			settings.text = `${error.response.data.msg}. Try with other email.` ?? error.message;

			SwalAlert(settings, false);
		}
	};

	const handleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleShowCNPassword = () => {
		setShowCNPassword(!showCNPassword);
	};

	return (
		<div id='Login'>
			<h1 className='title-heading'>
				<span className='subtitle-b-b'>Sign Up</span>
			</h1>
			<div className='mt-10 border rounded-md px-4 py-5'>
				<FormikForm initialValues={initialValues} schema={schema} onSubmit={handleSubmit}>
					<div className='Form-group'>
						<label htmlFor='username' className='Form-label'>
							Name
						</label>
						<InputFormik id='username' name='username' type='text' />
						<Message name='username' />
					</div>

					<div className='Form-group'>
						<label htmlFor='email' className='Form-label'>
							Email
						</label>
						<InputFormik id='email' name='email' placeholder='example@example.com' type='email' />
						<Message name='email' />
					</div>

					<div className='Form-group'>
						<label htmlFor='password' className='Form-label'>
							Password
						</label>
						<div className='relative flex justify-between'>
							<InputFormik
								customClass=''
								id='password'
								name='password'
								placeholder='*******'
								type={showPassword ? 'text' : 'password'}
							/>
							<FontAwesomeIcon
								className='Formik-password icon'
								onClick={handleShowPassword}
								icon={showPassword ? faEye : faEyeSlash}
							/>
						</div>
						<Message name='password' />
					</div>

					<div className='Form-group'>
						<label htmlFor='cnpassword' className='Form-label'>
							Confirm Password
						</label>
						<div className='relative flex justify-between'>
							<InputFormik
								customClass=''
								id='cnpassword'
								name='cnpassword'
								placeholder='*******'
								type={showCNPassword ? 'text' : 'password'}
							/>
							<FontAwesomeIcon
								className='Formik-password icon'
								onClick={handleShowCNPassword}
								icon={showCNPassword ? faEye : faEyeSlash}
							/>
						</div>
						<Message name='cnpassword' />
					</div>

					<Input type='submit' value='Sign Up' customClass='Form-submit bg-sky-600' />
				</FormikForm>
			</div>

			<nav className=''>
				{/* <Link to='/' className='Login-link'> */}
				<Link onClick={() => navigateTo('/')} className='Login-link'>
					You already have an account? <span className='underline underline-offset-4 '>Sign In!</span>
				</Link>
			</nav>
		</div>
	);
};

export default Signup;

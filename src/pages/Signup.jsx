import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import FormikForm from '../components/FormikForm/Index';
import InputFormik from '../components/InputFormik/Index';
import * as Yup from 'yup';
import Input from '../components/Input/Index';
import { useState } from 'react';
import Message from '../components/InputFormik/Message';
import axiosInstance from '../config/axios';
import { pages } from '../components/helpers/Links';

const Signup = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [showCNPassword, setShowCNPassword] = useState(false);

	const navigation = useNavigate();

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

		try {
			const response = await axiosInstance.post('/users', { name: username, email, password });
			const {
				data: { msg },
			} = response;

			resetForm({ values: '' });
			showSuccessMessage(msg);
		} catch (error) {
			showErrorMessage(error.response.data.msg);
		}
	};

	const showSuccessMessage = (text) => {
		Swal.fire({
			icon: 'success',
			title: '',
			text: text,
			background: '#1a1a1a',
			color: 'white',
			confirmButtonColor: '#2bd728',
			width: 450,
			showClass: {
				popup: 'animate__animated animate__fadeIn animate__faster',
			},
			hideClass: {
				popup: 'animate__animated animate__fadeOut animate__faster',
			},
			preConfirm: () => {
				navigation(pages.login);
			},
		});
	};

	const showErrorMessage = (text) => {
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: text,
			background: '#1a1a1a',
			color: 'white',
			confirmButtonColor: '#db4e4e',
			width: 450,
			showClass: {
				popup: 'animate__animated animate__fadeIn animate__faster',
			},
			hideClass: {
				popup: 'animate__animated animate__fadeOut animate__faster',
			},
		});
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
					<div className='Login-group'>
						<label htmlFor='username' className='Login-label'>
							Name
						</label>
						<InputFormik id='username' name='username' placeholder='Pablo' type='text' />
						<Message name='username' />
					</div>

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

					<div className='Login-group'>
						<label htmlFor='cnpassword' className='Login-label'>
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

					<Input type='submit' value='Sign Up' customClass='Login-submit' />
				</FormikForm>
			</div>

			<nav className=''>
				<p className='Login-link'>
					You already have an account?{' '}
					<Link to='/' className='underline underline-offset-4 hover:text-yellow-500 transition-colors'>
						Sign In!
					</Link>
				</p>
			</nav>
		</div>
	);
};

export default Signup;

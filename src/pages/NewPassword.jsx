import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import FormikForm from '../components/FormikForm/Index';
import Input from '../components/Input/Index';
import InputFormik from '../components/InputFormik/Index';
import Message from '../components/InputFormik/Message';
import axiosInstance from '../config/axios';
import { SwalAlert } from '../helpers/SwalAlert';
import useDocumentTitle from '../hooks/useDocumentTitle';

const NewPassword = () => {
	const { token } = useParams();
	const navigate = useNavigate();

	useDocumentTitle('UpTask - Change Password');

	const [showPassword, setShowPassword] = useState(false);
	const [showCNPassword, setShowCNPassword] = useState(false);
	const [isValidToken, setIsValidToken] = useState(false);

	const settings = {
		icon: '',
		title: '',
		text: '',
		preConfirm: null,
	};

	useEffect(() => {
		const checkToken = async () => {
			try {
				await axiosInstance.get(`/users/reset-password/${token}`);
				setIsValidToken(true);
			} catch (error) {
				setIsValidToken(false);
				settings.icon = 'error';
				settings.title = 'Oops...';
				settings.text = error.response.data.msg ?? error.message;
				settings.preConfirm = () => {
					flushSync(() => {
						navigate('/reset-password');
					});
				};

				SwalAlert(settings, false);
			}
		};

		checkToken();

		// eslint-disable-next-line
	}, []);

	const schema = Yup.object({
		newPassword: Yup.string()
			.required('*Password is required')
			.min(6, 'Must contain at least 6 characters')
			.max(20, 'Limit has been reached(20)'),
		cnpassword: Yup.string().when('newPassword', (password, field) =>
			password ? field.required('*Required Field').oneOf([Yup.ref('newPassword')], '*Passwords no matches') : field
		),
	});

	const initialValues = {
		newPassword: '',
		cnpassword: '',
	};

	const handleSubmit = async (values) => {
		const { newPassword } = values;

		try {
			const { data } = await axiosInstance.put(`/users/reset-password/${token}`, { password: newPassword });

			settings.icon = 'success';
			settings.text = `${data.msg}. Try to login with your new password.`;
			settings.preConfirm = () => {
				navigate('/');
			};

			SwalAlert(settings);
		} catch (error) {
			settings.icon = 'error';
			settings.title = 'Oops...';
			settings.text = error.response.data.msg ?? error.message;

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
		<>
			{isValidToken && (
				<div>
					<h1 className='title-sub mb-10 md:text-4xl'>
						Write your New Password below<span className='text-yellow-500'>.</span>
					</h1>
					<div className='border px-4 py-5 rounded-md'>
						<FormikForm initialValues={initialValues} schema={schema} onSubmit={handleSubmit}>
							<div className='Login-group'>
								<label htmlFor='newPassword' className='Login-label'>
									New Password
								</label>
								<div className='relative flex justify-between'>
									<InputFormik
										customClass=''
										id='newPassword'
										name='newPassword'
										placeholder='*******'
										type={showPassword ? 'text' : 'password'}
									/>
									<FontAwesomeIcon
										className='Formik-password icon'
										onClick={handleShowPassword}
										icon={showPassword ? faEye : faEyeSlash}
									/>
								</div>
								<Message name='newPassword' />
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

							<Input type='submit' value='Change password' customClass='Login-submit w-auto text-base' />
						</FormikForm>
					</div>
				</div>
			)}
		</>
	);
};

export default NewPassword;

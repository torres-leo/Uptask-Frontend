import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import FormikForm from '../components/FormikForm/Index';
import Input from '../components/Input/Index';
import InputFormik from '../components/InputFormik/Index';
import Message from '../components/InputFormik/Message';
import { useState } from 'react';

const NewPassword = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [showCNPassword, setShowCNPassword] = useState(false);

	const schema = Yup.object({
		newPassword: Yup.string().required('*Password is required'),
		cnpassword: Yup.string().when('password', (password, field) =>
			password ? field.required('*Required Field').oneOf([Yup.ref('password')], '*Passwords no matches') : field
		),
	});

	const initialValues = {
		newPassword: '',
		cnpassword: '',
	};

	const handleSubmit = (values) => {
		// const { email, password } = values;
		console.log(values);
	};

	const handleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleShowCNPassword = () => {
		setShowCNPassword(!showCNPassword);
	};

	return (
		<div className='Newpassword'>
			<h1 className='Newpassword-title'>
				Write your New Password below<span className='text-yellow-500'>.</span>
			</h1>
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

				<Input type='submit' value='Sign Up' customClass='Login-submit' />
			</FormikForm>
		</div>
	);
};

export default NewPassword;

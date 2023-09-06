import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons';
import FormikForm from '../components/FormikForm/Index';
import Input from '../components/Input/Index';
import InputFormik from '../components/InputFormik/Index';
import Message from '../components/InputFormik/Message';

const ResetPassword = () => {
	const schema = Yup.object({
		email: Yup.string().required('*Email is required').email('*Must be a valid email'),
	});

	const initialValues = {
		email: '',
	};

	const handleSubmit = (values) => {
		// const { email, password } = values;
		console.log(values);
	};

	return (
		<div id='ResetP'>
			<h1 className='title-sub'>Forgot password?</h1>
			<div className='mt-6 rounded-md px-4 py-5'>
				<p className='text-sm text-gray-300 mb-2'>
					Write your email and in a few minutes you will receive the instructions to recover your password.
				</p>

				<FormikForm initialValues={initialValues} schema={schema} onSubmit={handleSubmit}>
					<div className='Login-group'>
						<InputFormik id='email' name='email' placeholder='example@example.com' type='email' />
						<Message name='email' />
					</div>

					<Input type='submit' value='Sign Up' customClass='Login-submit' />
				</FormikForm>
			</div>

			<div className='flex justify-center text-gray-300'>
				<Link to='/' className='underline underline-offset-4 hover:text-yellow-500 transition-colors '>
					<FontAwesomeIcon icon={faAnglesLeft} />
					Go Back
				</Link>
			</div>
		</div>
	);
};

export default ResetPassword;

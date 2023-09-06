import FormikForm from '../components/FormikForm/Index';
import Input from '../components/Input/Index';
import InputFormik from '../components/InputFormik/Index';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
	const schema = Yup.object({
		email: Yup.string().required('*Email is required').email('*Must be a valid email'),
		password: Yup.string().required('*Password is required'),
	});

	const initialValues = {
		email: '',
		password: '',
	};

	const handleSubmit = (values) => {
		// const { email, password } = values;
		console.log(values);
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
					</div>

					<div className='Login-group'>
						<label htmlFor='password' className='Login-label'>
							Password
						</label>
						<InputFormik id='password' name='password' placeholder='*******' type='password' customClass='' />
					</div>

					<Input type='submit' value='Log In' customClass='Login-submit' />
				</FormikForm>
			</div>

			<nav className='lg:flex lg:justify-between'>
				<Link className='Login-link' to='signup'>
					You do not have an account? <span className='underline underline-offset-4'>Sign up!</span>
				</Link>
				<Link className='Login-link' to='reset-password'>
					Forget my password <FontAwesomeIcon icon={faLock} />
				</Link>
			</nav>
		</div>
	);
};

export default Login;

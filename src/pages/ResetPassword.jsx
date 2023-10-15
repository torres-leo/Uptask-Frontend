import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons';

import FormikForm from '../components/FormikForm/Index';
import Input from '../components/Input/Index';
import InputFormik from '../components/InputFormik/Index';
import Message from '../components/InputFormik/Message';
import { pages } from '../components/helpers/Links';
import { SwalAlert } from '../components/helpers/SwalAlert';
import axiosInstance from '../config/axios';
import useNavigateTo from '../hooks/useNavigation';
import useDocumentTitle from '../hooks/useDocumentTitle';
('../hooks/useDocumentTitle');

const ResetPassword = () => {
	const navigate = useNavigate();
	const navigateTo = useNavigateTo();

	useDocumentTitle('UpTask - Reset Password');

	const schema = Yup.object({
		email: Yup.string().required('*Email is required').email('*Must be a valid email'),
	});

	const initialValues = {
		email: '',
	};

	const handleSubmit = async (values) => {
		const { email } = values;
		const settings = {
			icon: '',
			title: '',
			text: '',
			preConfirm: null,
		};

		try {
			const { data } = await axiosInstance.post(`/users/reset-password`, { email });
			settings.icon = 'success';
			settings.text = data.msg;
			settings.preConfirm = () => {
				navigate(pages.login);
			};

			SwalAlert(settings);
		} catch (error) {
			settings.icon = 'error';
			settings.title = 'Oops...';
			settings.text = error.response.data.msg ?? error.message;

			SwalAlert(settings, false);
		}
	};

	return (
		<div id='ResetP' className='mt-20'>
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

					<Input type='submit' value='Send' customClass='Form-submit tracking-widest bg-sky-600' />
				</FormikForm>
			</div>

			<div className='flex justify-center text-gray-300'>
				<Link
					onClick={() => navigateTo('/')}
					className='underline underline-offset-4 hover:text-yellow-500 transition-colors '>
					<FontAwesomeIcon icon={faAnglesLeft} />
					Go Back
				</Link>
			</div>
		</div>
	);
};

export default ResetPassword;

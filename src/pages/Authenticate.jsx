import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { pages } from '../helpers/Links';
import { SwalAlert } from '../helpers/SwalAlert';
import axiosInstance from '../config/axios';
import useDocumentTitle from '../hooks/useDocumentTitle';
import useNavigateTo from '../hooks/useNavigation';

const Authenticate = () => {
	const { token } = useParams();
	const navigateTo = useNavigateTo();
	useDocumentTitle('UpTask - Authenticate Account');

	const settings = {
		icon: '',
		title: '',
		text: '',
		preConfirm: null,
	};

	useEffect(() => {
		const authAccount = async () => {
			try {
				const response = await axiosInstance(`/users/confirm-user/${token}`);
				const {
					data: { msg },
				} = response;

				settings.icon = 'success';
				settings.title = '';
				settings.text = msg;
				settings.preConfirm = () => {
					navigateTo(pages.login);
				};

				SwalAlert(settings, true);
			} catch (error) {
				settings.icon = 'error';
				settings.title = 'Oops...';
				settings.text = error.response.data.msg ?? error.message;
				settings.preConfirm = () => {
					navigateTo(pages.login);
				};

				SwalAlert(settings, false);
			}
		};

		authAccount();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<h1 className='title-sub tracking-wider max-w-md'>
				Authenticating Account<span className='text-yellow-500'>.</span>
			</h1>
			<p></p>
		</>
	);
};

export default Authenticate;

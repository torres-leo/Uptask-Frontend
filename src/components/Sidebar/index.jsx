import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import useNavigateTo from '../../hooks/useNavigation';
import useAuth from '../../hooks/useAuth';

const Sidebar = () => {
	const navigateTo = useNavigateTo();
	const { auth } = useAuth();

	return (
		<aside className='Sidebar'>
			<p className='mb-4 text-left text-white'>
				Hello, <span className='text-yellow-500 capitalize'>{auth.name}</span>.
			</p>

			<Link className='Sidebar-element' onClick={() => navigateTo('new-project')}>
				New Project
				<FontAwesomeIcon className='text-yellow-500' icon={faFolder} />
			</Link>
		</aside>
	);
};

export default Sidebar;

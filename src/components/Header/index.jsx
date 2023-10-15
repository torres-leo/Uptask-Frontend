import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import useNavigateTo from '../../hooks/useNavigation';
import Input from '../Input/Index';
import Button from '../Button';

const Header = () => {
	const navigateTo = useNavigateTo();

	return (
		<header className='Header'>
			<div className='md:flex md:justify-between'>
				<Link onClick={() => navigateTo('/projects')}>
					<h3 className='Header-logo'>UpTask</h3>
				</Link>

				<Input
					type='text'
					customClass='lg:w-96 placeholder:font-normal placeholder:text-base placeholder:tracking-wide placeholder:text-gray-500'
					placeholder='Search a project...'
				/>

				<div className='flex items-center justify-center gap-8'>
					<Link onClick={() => navigateTo('/projects')} className='Header-link'>
						Projects
					</Link>

					<Button
						type='button'
						customClass='text-white border border-red-500 hover:bg-red-500 hover:border-white hover:scale-110 px-2 bg-transparent'>
						Log out
						<FontAwesomeIcon className='ml-2 text-sm' icon={faArrowRightFromBracket} />
					</Button>
				</div>
			</div>
		</header>
	);
};

export default Header;

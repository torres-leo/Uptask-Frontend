import { Outlet } from 'react-router-dom';
import useNavigateTo from '../hooks/useNavigation';
import useAuth from '../hooks/useAuth';

const UserLayout = () => {
	const navigateTo = useNavigateTo();
	const { auth, loading } = useAuth();

	const handleLogin = () => {
		if (loading) return <h1 className='text-white text-center'>Loading...</h1>;

		if (!auth._id) navigateTo('/');

		return <Outlet />;
	};

	return <>{handleLogin()}</>;
};

export default UserLayout;

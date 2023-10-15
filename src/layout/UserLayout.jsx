import { Outlet } from 'react-router-dom';
import useNavigateTo from '../hooks/useNavigation';
import useAuth from '../hooks/useAuth';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const UserLayout = () => {
	const navigateTo = useNavigateTo();
	const { auth, loading } = useAuth();

	const handleLogin = () => {
		if (loading) return <h1 className='text-white text-center'>Loading...</h1>;

		if (!auth._id) navigateTo('/');

		return <Outlet />;
	};

	return (
		<>
			<Header />
			<div className='md:flex md:min-h-screen'>
				<Sidebar />
				<main className='flex-1 py-10 px-5 lg:px-20'>{handleLogin()}</main>
			</div>
		</>
	);
};

export default UserLayout;

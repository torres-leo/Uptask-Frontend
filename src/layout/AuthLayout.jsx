import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
	return (
		<>
			<main className='Layout'>
				<div className='Layout-container'>
					<Outlet />
				</div>
			</main>
		</>
	);
};

export default AuthLayout;

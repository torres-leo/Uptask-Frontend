import { useState, useEffect, createContext } from 'react';
import { useLocation } from 'react-router-dom';
import Proptypes from 'prop-types';
import axiosInstance from '../config/axios';
import useNavigateTo from '../hooks/useNavigation';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const location = useLocation();
	const path = location.pathname;

	const [auth, setAuth] = useState({});
	const [loading, setLoading] = useState(true);
	const navigateTo = useNavigateTo();

	useEffect(() => {
		const userAuthenticated = async () => {
			setLoading(true);
			const token = localStorage.getItem('uptask_token');
			if (!token) {
				setLoading(false);
				return;
			}

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};

			try {
				const { data } = await axiosInstance('/users/profile', config);
				setAuth(data.user);

				if (path === '/') {
					navigateTo('/projects');
				}
			} catch (error) {
				setAuth({});
				console.log(error);
			} finally {
				setLoading(false);
			}
		};

		userAuthenticated();
	}, [path]);

	return <AuthContext.Provider value={{ auth, setAuth, loading }}>{children}</AuthContext.Provider>;
};

export { AuthProvider };
export default AuthContext;

AuthProvider.propTypes = {
	children: Proptypes.node,
};

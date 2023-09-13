import { useState, useEffect, createContext } from 'react';
import Proptypes from 'prop-types';
import axiosInstance from '../config/axios';
import useNavigateTo from '../hooks/useNavigation';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
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
				navigateTo('/projects');
			} catch (error) {
				setAuth({});
				console.log(error);
			} finally {
				setLoading(false);
			}
		};

		userAuthenticated();
	}, []);

	return <AuthContext.Provider value={{ auth, setAuth, loading }}>{children}</AuthContext.Provider>;
};

export { AuthProvider };
export default AuthContext;

AuthProvider.propTypes = {
	children: Proptypes.node,
};

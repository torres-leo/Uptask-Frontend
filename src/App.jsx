import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthProvider';
import Authenticate from './pages/Authenticate';
import AuthLayout from './layout/AuthLayout';
import Login from './pages/Login';
import NewPassword from './pages/NewPassword';
import Projects from './pages/Projects';
import ResetPassword from './pages/ResetPassword';
import Signup from './pages/Signup';
import UserLayout from './layout/UserLayout';
// import NotFoundPage from './pages/NotFoundPage';

function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<Routes>
					<Route path='/' element={<AuthLayout />}>
						<Route index element={<Login />} />
						<Route path='signup' element={<Signup />} />
						<Route path='reset-password' element={<ResetPassword />} />
						<Route path='reset-password/:token' element={<NewPassword />} />
						<Route path='authenticate/:token' element={<Authenticate />} />
					</Route>

					<Route path='/projects' element={<UserLayout />}>
						<Route path='/projects' element={<Projects />} />
					</Route>
					{/* <Route path='*' element={<NotFoundPage />} /> */}
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;

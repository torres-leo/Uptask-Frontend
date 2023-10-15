import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthProvider';
import { ProjectProvider } from './context/ProjectProvider';
import Authenticate from './pages/Authenticate';
import AuthLayout from './layout/AuthLayout';
import Login from './pages/Login';
import NewPassword from './pages/NewPassword';
import Projects from './pages/ProjectPages/Projects';
import ResetPassword from './pages/ResetPassword';
import Signup from './pages/Signup';
import UserLayout from './layout/UserLayout';
import NewProject from './pages/ProjectPages/NewProject';
// import NotFoundPage from './pages/NotFoundPage';

function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<ProjectProvider>
					<Routes>
						<Route path='/' element={<AuthLayout />}>
							<Route index element={<Login />} />
							<Route path='signup' element={<Signup />} />
							<Route path='reset-password' element={<ResetPassword />} />
							<Route path='reset-password/:token' element={<NewPassword />} />
							<Route path='authenticate/:token' element={<Authenticate />} />
						</Route>

						<Route path='/projects' element={<UserLayout />}>
							<Route index element={<Projects />} />
							<Route path='new-project' element={<NewProject />} />
						</Route>

						{/* <Route path='*' element={<NotFoundPage />} /> */}
					</Routes>
				</ProjectProvider>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;

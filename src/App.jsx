import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Authenticate from './pages/Authenticate';
import AuthLayout from './layout/AuthLayout';
import Login from './pages/Login';
import NewPassword from './pages/NewPassword';
import ResetPassword from './pages/ResetPassword';
import Signup from './pages/Signup';

// import 'sweetalert2/src/sweetalert2.scss';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<AuthLayout />}>
					<Route index element={<Login />} />
					<Route path='signup' element={<Signup />} />
					<Route path='reset-password' element={<ResetPassword />} />
					<Route path='reset-password/:token' element={<NewPassword />} />
					<Route path='authenticate/:id' element={<Authenticate />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;

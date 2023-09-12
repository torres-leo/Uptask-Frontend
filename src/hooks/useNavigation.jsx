import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { flushSync } from 'react-dom';

function useNavigateTo() {
	const navigate = useNavigate();

	const navigateTo = useCallback((destination) => {
		document.startViewTransition(() => {
			flushSync(() => {
				navigate(destination);
			});
		});
	}, []);

	return navigateTo;
}

export default useNavigateTo;

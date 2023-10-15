import Swal from 'sweetalert2';

export const SwalAlert = (settings, isSuccess = true) => {
	Swal.fire({
		...settings,
		background: '#252424',
		color: 'white',
		width: 450,
		confirmButtonColor: isSuccess ? '#2bd728' : '#db4e4e',
		showClass: {
			popup: 'animate__animated animate__fadeIn animate__faster',
		},
		hideClass: {
			popup: 'animate__animated animate__fadeOut animate__faster',
		},
	});
};

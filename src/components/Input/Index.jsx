import PropTypes from 'prop-types';
// import { useEffect } from 'react';

const Input = ({ type, customClass, placeholder, value, onClick, onChange }) => {
	const handleTypeForClass = (type) => {
		let classes = '';
		switch (type) {
			case 'submit' || 'button':
				classes = 'hover:cursor-pointer';
				break;
			// case 'button':
			// 	classes = 'hover:cursor-pointer';
			// 	break;
			default:
				break;
		}

		return classes;
	};

	return (
		<input
			type={type}
			placeholder={placeholder}
			className={`Input ${customClass} ${handleTypeForClass(type)}`}
			value={value}
			onClick={onClick}
			onChange={onChange}
		/>
	);
};

Input.propTypes = {
	name: PropTypes.string,
	customClass: PropTypes.string,
	placeholder: PropTypes.string,
	value: PropTypes.string || PropTypes.number,
	onClick: PropTypes.func,
	onChange: PropTypes.func,
	type: PropTypes.oneOf([
		'button',
		'checkbox',
		'color',
		'date',
		'datetime-local',
		'email',
		'file',
		'hidden',
		'image',
		'month',
		'number',
		'password',
		'radio',
		'range',
		'reset',
		'search',
		'submit',
		'tel',
		'text',
		'time',
		'url',
		'week',
	]),
};

export default Input;

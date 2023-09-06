import { Field } from 'formik';
import PropTypes from 'prop-types';

const InputFormik = ({ id, name, placeholder, type, customClass }) => {
	return (
		<Field
			autoComplete='off'
			className={`Formik-input ${customClass}`}
			id={id}
			name={name}
			placeholder={placeholder}
			type={type}
		/>
	);
};

InputFormik.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	customClass: PropTypes.string,
	value: PropTypes.string || PropTypes.number,
	onChange: PropTypes.func,
	placeholder: PropTypes.string,
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

export default InputFormik;

import PropTypes from 'prop-types';

const Button = ({ children, type, customClass }) => {
	return (
		<button type={type} className={`Button ${customClass ?? ''}`}>
			{children}
		</button>
	);
};

Button.propTypes = {
	customClass: PropTypes.string,
	onClick: PropTypes.func,
	children: PropTypes.node,
	type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

export default Button;

import { ErrorMessage } from 'formik';
import PropTypes from 'prop-types';

const Message = ({ name }) => {
	return (
		<p className='Formik-errors'>
			<ErrorMessage name={name} />
		</p>
	);
};

export default Message;

Message.propTypes = {
	name: PropTypes.string.isRequired,
};

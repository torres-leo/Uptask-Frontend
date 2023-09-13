import { Formik, Form } from 'formik';
import PropTypes from 'prop-types';

const FormikForm = ({ children, initialValues, schema, onSubmit }) => {
	return (
		<Formik initialValues={initialValues} validationSchema={schema} onSubmit={onSubmit}>
			<Form autoComplete='off'>{children}</Form>
		</Formik>
	);
};

FormikForm.propTypes = {
	children: PropTypes.node,
	initialValues: PropTypes.object,
	schema: PropTypes.object,
	onSubmit: PropTypes.func,
};

export default FormikForm;

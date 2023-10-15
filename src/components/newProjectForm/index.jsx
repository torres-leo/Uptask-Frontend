import * as Yup from 'yup';
import { useField } from 'formik';
import PropTypes from 'prop-types';

import FormikForm from '../FormikForm/Index';
import InputFormik from '../InputFormik/Index';
import Message from '../InputFormik/Message';
import Input from '../Input/Index';
import useProjects from '../../hooks/useProjects';

const MyTextArea = ({ label, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<>
			<label htmlFor={props.id || props.name} className='inline-block mb-2 text-white'>
				{label}
			</label>
			<textarea
				className='bg-zinc-100 w-full outline-none resize-none rounded-md p-2 tracking-wide h-24 overflow-y-auto text-sm font-light'
				{...field}
				{...props}
			/>
			{meta.touched && meta.error ? <div className='text-red-500 text-xs'>{meta.error}</div> : null}
			{/* <Message name={props.name} /> */}
		</>
	);
};

MyTextArea.propTypes = {
	label: PropTypes.string,
	id: PropTypes.string,
	name: PropTypes.string,
};

const NewProjectForm = () => {
	const { createProject } = useProjects();

	const schema = Yup.object({
		name: Yup.string()
			.required('*Please, write a name for your project')
			.min(10, '*Must be at least 10 characters')
			.max(200, '*Must be at most 200 characters'),
		description: Yup.string()
			.required('*Write a description for your project')
			.min(20, '*Must be at least 20 characters')
			.max(3000, '*Must be at most 3000 characters'),
		deadline: Yup.date()
			.required('*Please, select a deadline for your project')
			.min(new Date().toISOString().split('T')[0], '*Deadline must be greater than today'),
		client: Yup.string().required('*Please, write the name of the client'),
	});

	const initialValues = {
		name: '',
		description: '',
		deadline: '',
		client: '',
	};

	const handleSubmit = async (values) => {
		const { name, description, deadline, client } = values;

		await createProject({
			title: name,
			description,
			deadline,
			client,
		});
	};

	return (
		<div className='p-5 bg-white/20 w-4/5 xl:w-1/2 rounded-lg'>
			<FormikForm initialValues={initialValues} schema={schema} onSubmit={handleSubmit}>
				<div className='Form-group'>
					<label htmlFor='name' className='text-white'>
						Project name
					</label>
					<InputFormik
						id='name'
						name='name'
						type='text'
						customClass='bg-zinc-200 focus:ring-0 placeholder:text-zinc-500 font-light'
						placeholder='Write the name for your project...'
					/>
					<Message name='name' />
				</div>

				<div className='Form-group'>
					<MyTextArea
						label='Description'
						id='description'
						name='description'
						placeholder='Write the details for this project'
					/>
				</div>

				<div className='Form-group'>
					<label className='text-white' htmlFor='deadline'>
						Deadline
					</label>
					<InputFormik
						id='deadline'
						name='deadline'
						type='date'
						customClass='bg-zinc-200 focus:ring-0 placeholder:text-zinc-500 font-light'
						placeholder='Write the name for your project...'
					/>
					<Message name='deadline' />
				</div>

				<div className='Form-group'>
					<label htmlFor='client' className='text-white'>
						Client
					</label>
					<InputFormik
						id='client'
						name='client'
						type='text'
						customClass='bg-zinc-200 focus:ring-0 placeholder:text-zinc-500 font-light'
						placeholder='Client name...'
					/>
					<Message name='client' />
				</div>

				<div className='xl:w-full xl:relative xl:h-12 mt-6'>
					<Input
						type='submit'
						value='Create'
						customClass='Form-submit bg-sky-600 w-full xl:w-1/3 xl:absolute xl:right-0'
					/>
				</div>
			</FormikForm>
		</div>
	);
};

export default NewProjectForm;

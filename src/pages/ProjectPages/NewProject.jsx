import NewProjectForm from '../../components/newProjectForm';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const NewProject = () => {
	useDocumentTitle('UpTask - New Project');

	return (
		<>
			<h1 className='text-gray-100 text-3xl font-semibold tracking-wider capitalize'>new Project</h1>
			<div className='mt-10 flex justify-center'>
				<NewProjectForm />
			</div>
		</>
	);
};

export default NewProject;

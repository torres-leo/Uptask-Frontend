import useDocumentTitle from '../../hooks/useDocumentTitle';
import useProjects from '../../hooks/useProjects';

const Projects = () => {
	useDocumentTitle('UpTask - Projects');
	const { projects } = useProjects();
	console.log(projects);

	return (
		<>
			<h1 className='text-gray-100 text-3xl font-semibold tracking-wide capitalize'>Projects</h1>
		</>
	);
};

export default Projects;

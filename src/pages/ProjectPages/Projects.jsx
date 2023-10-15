import useDocumentTitle from '../../hooks/useDocumentTitle';
import useProjects from '../../hooks/useProjects';

const Projects = () => {
	useDocumentTitle('UpTask - Projects');
	const { projects } = useProjects();
	console.log(projects);

	const renderProjects = () => {
		return projects.map((project) => (
			<div key={project.id} className='bg-gray-800 rounded-lg shadow-md p-4 mb-3'>
				<p className='text-gray-100 font-normal'>{project.title}</p>
				<p className='text-sm text-gray-400'>{project.description}</p>
			</div>
		));
	};

	return (
		<>
			<h1 className='text-gray-100 text-4xl font-semibold tracking-wide capitalize mb-8'>Projects</h1>
			<div>{renderProjects()}</div>
		</>
	);
};

export default Projects;

import { useState, createContext } from 'react';
import Proptypes from 'prop-types';
import { pages } from '../components/helpers/Links';
import { SwalAlert } from '../components/helpers/SwalAlert';
import axiosInstance from '../config/axios';
import useNavigateTo from '../hooks/useNavigation';

const ProjectContext = createContext();

const ProjectProvider = ({ children }) => {
	const navigateTo = useNavigateTo();

	const [projects, setProjects] = useState([]);

	const settings = {
		icon: '',
		title: '',
		text: '',
		preConfirm: null,
	};

	const createProject = async (project) => {
		try {
			const token = localStorage.getItem('uptask_token');
			if (!token) return;

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};

			const { data } = await axiosInstance.post('/projects', project, config);
			console.log(data);
			// setProjects([...projects, data.project]);
			settings.icon = 'success';
			settings.text = 'Your project has been created successfully';
			settings.preConfirm = () => {
				navigateTo(pages.projects);
			};
			SwalAlert(settings);
		} catch (error) {
			console.log(error);
		}
	};

	return <ProjectContext.Provider value={{ projects, setProjects, createProject }}>{children}</ProjectContext.Provider>;
};

export { ProjectProvider };
export default ProjectContext;

ProjectProvider.propTypes = {
	children: Proptypes.node,
};

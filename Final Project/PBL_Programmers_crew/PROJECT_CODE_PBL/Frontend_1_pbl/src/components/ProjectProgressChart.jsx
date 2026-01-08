import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/ProjectProgressChart.css';

const ProjectProgressChart = ({ tasks }) => {
  const { user } = useAuth();
  const [progressData, setProgressData] = useState([]);

  useEffect(() => {
    if (tasks && tasks.length > 0) {
      const completedTasks = tasks.filter(task => task.completed).length;
      const totalTasks = tasks.length;
      const progressPercentage = Math.round((completedTasks / totalTasks) * 100);

      setProgressData([
        {
          id: 1,
          name: 'Task Completion',
          progress: progressPercentage,
        },
      ]);
    }
  }, [tasks]);

  const graphHeading = user.role === 'employee' 
    ? 'Task Completion Progress' 
    : 'Project Completion Progress';

  return (
    <div className="project-progress-chart">
      <h2>{graphHeading}</h2>
      <ul>
        {progressData.map((project) => (
          <li key={project.id} className="project-item">
            <span className="project-name">{project.name}</span>
            <div className="progress-bar">
              <div
                className="progress"
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
            <span className="progress-percentage">{project.progress}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectProgressChart;
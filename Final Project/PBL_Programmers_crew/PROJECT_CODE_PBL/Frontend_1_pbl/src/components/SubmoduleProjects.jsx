import React from 'react';
import { useSubModules } from '../context/AuthContext';
import '../styles/SubModule.css';

const SubmoduleProjects = ({ goBack }) => {
  const { subModules } = useSubModules();

  return (
    <div className="submodule-container">
      <button className="back-button" onClick={goBack}>Back</button>
      <h1>Submodule Projects</h1>
      <ul className="submodule-list">
        {subModules.map((subModule, index) => (
          <li key={index} className="submodule-item">
            <h2>{subModule.name}</h2>
            <p>{subModule.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubmoduleProjects;
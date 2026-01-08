import React, { useState } from 'react';
import { useSubModules } from '../context/AuthContext';
import '../styles/SubModule.css';

const SubModule = ({ goBack }) => {
  const { subModules, setSubModules } = useSubModules();
  const [newSubModule, setNewSubModule] = useState({ name: '', description: '' });

  const handleAddSubModule = () => {
    if (newSubModule.name.trim() && newSubModule.description.trim()) {
      setSubModules([...subModules, newSubModule]);
      setNewSubModule({ name: '', description: '' });
    }
  };

  return (
    <div className="submodule-container">
      <button className="back-button" onClick={goBack}>Back</button>
      <h1>Submodules</h1>
      <div className="add-submodule">
        <input
          type="text"
          value={newSubModule.name}
          onChange={(e) => setNewSubModule({ ...newSubModule, name: e.target.value })}
          placeholder="Submodule Name"
        />
        <textarea
          value={newSubModule.description}
          onChange={(e) => setNewSubModule({ ...newSubModule, description: e.target.value })}
          placeholder="Submodule Description"
        ></textarea>
        <button onClick={handleAddSubModule}>Add Submodule</button>
      </div>
      <ul className="submodule-list">
        {/* Removed displaying of submodules */}
      </ul>
    </div>
  );
};

export default SubModule;

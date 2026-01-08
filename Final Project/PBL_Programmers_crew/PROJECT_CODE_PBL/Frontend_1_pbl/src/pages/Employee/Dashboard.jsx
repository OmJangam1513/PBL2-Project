import React from 'react';
import ProjectProgressChart from '../../components/ProjectProgressChart';
import '../../styles/Dashboard.css';
import '../../styles/ProjectProgressChart.css';
import { useTasks } from '../../context/AuthContext';

const EmployeeDashboard = ({ setActivePage }) => {
  const { tasks } = useTasks();

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome, Employee</h1>
        <div className="user-info">
          <span>EmployeeName</span>
          <span className="settings-icon">⚙️</span>
        </div>
      </header>
      <div className="dashboard-layout">
        <aside className="dashboard-sidebar left-sidebar">
          <div className="section" onClick={() => setActivePage("tasks")}>Tasks</div>
          <div className="section" onClick={() => setActivePage("submoduleProjects")}>Submodule Projects</div>
          <div className="section" onClick={() => setActivePage("news")}>News</div>
        </aside>
        <main className="dashboard-main">
          <ProjectProgressChart tasks={tasks} />
        </main>
        <aside className="dashboard-sidebar right-sidebar">
          <div className="section" onClick={() => setActivePage("notices")}>Notices</div>
          <div className="section" onClick={() => setActivePage("communication")}>Communication</div>
          <div className="section" onClick={() => setActivePage("department")}>Department</div>
        </aside>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
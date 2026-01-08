"use client"

import { useState, useEffect } from "react";
import { useAuth, TaskProvider, SubModuleProvider } from "./context/AuthContext";
import Settings from "./components/Settings";
import Profile from "./components/Profile";
import Communication from "./components/Communication";
import Department from "./components/Department";
import SubModule from "./components/SubModule";
import Notifications from "./components/Notifications";
import DepartmentHeadDashboard from "./pages/DepartmentHead/Dashboard";
import EmployeeDashboard from "./pages/Employee/Dashboard";
import ProjectHeadDashboard from "./pages/ProjectHead/Dashboard";
import Login from "./components/Login";
import News from "./components/News";
import Tasks from "./components/Tasks";
import Notices from "./components/Notices";
import SubmoduleProjects from "./components/SubmoduleProjects";
import "./styles/App.css";

function App() {
  const [activeComponent, setActiveComponent] = useState(null);
  const { user, loading, logout } = useAuth();

  useEffect(() => {
    if (user) {
      // Set default dashboard based on user role after login
      if (user.role === "department_head") {
        setActiveComponent("departmentHeadDashboard");
      } else if (user.role === "employee") {
        setActiveComponent("employeeDashboard");
      } else if (user.role === "project_head") {
        setActiveComponent("projectHeadDashboard");
      } else {
        setActiveComponent("profile");
      }
    }
  }, [user]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!user) {
    return <Login />;
  }

  const renderComponent = () => {
    switch (activeComponent) {
      case "departmentHeadDashboard":
        return <DepartmentHeadDashboard setActivePage={setActiveComponent} />;
      case "employeeDashboard":
        return <EmployeeDashboard setActivePage={setActiveComponent} />;
      case "projectHeadDashboard":
        return <ProjectHeadDashboard setActivePage={setActiveComponent} />;
      case "profile":
        return <Profile />;
      case "settings":
        return <Settings onNavigateToProfile={() => setActiveComponent("profile")} />;
      case "notifications":
        return <Notifications />;
      case "communication":
        return <Communication goBack={() => setActiveComponent(user.role === "department_head" ? "departmentHeadDashboard" : user.role === "project_head" ? "projectHeadDashboard" : "employeeDashboard")} />;
      case "department":
        return <Department goBack={() => setActiveComponent(user.role === "department_head" ? "departmentHeadDashboard" : user.role === "project_head" ? "projectHeadDashboard" : "employeeDashboard")} />;
      case "news":
        return <News goBack={() => setActiveComponent(user.role === "department_head" ? "departmentHeadDashboard" : user.role === "project_head" ? "projectHeadDashboard" : "employeeDashboard")} />;
      case "submodule":
        return (
          <SubModule
            goBack={() =>
              setActiveComponent(
                user.role === "department_head"
                  ? "departmentHeadDashboard"
                  : "projectHeadDashboard"
              )
            }
          />
        );
      case "tasks":
        return <Tasks goBack={() => setActiveComponent(user.role === "department_head" ? "departmentHeadDashboard" : "projectHeadDashboard")} />;
      case "notices":
        return <Notices goBack={() => setActiveComponent(user.role === "department_head" ? "departmentHeadDashboard" : user.role === "project_head" ? "projectHeadDashboard" : "employeeDashboard")} />;
      case "submoduleProjects":
        return <SubmoduleProjects goBack={() => setActiveComponent(user.role === "department_head" ? "departmentHeadDashboard" : "projectHeadDashboard")} />;
      default:
        return <Profile />;
    }
  };

  return (
    <TaskProvider>
      <SubModuleProvider>
        <div className="app-container">
          <header className="app-header">
            <h1>Project Management and Employee Profile Building Platform</h1>
            <div className="user-info">
              <span>Welcome, {user.name}</span>
              <span className="role-badge">{user.role}</span>
              <button className="logout-button" onClick={logout}>
                Logout
              </button>
            </div>
          </header>

          <div className="app-content">
            <nav className="app-nav">
              <ul>
                {user.role === "department_head" && (
                  <li
                    className={
                      activeComponent === "departmentHeadDashboard" ? "active" : ""
                    }
                    onClick={() => setActiveComponent("departmentHeadDashboard")}
                  >
                    Department Head Dashboard
                  </li>
                )}
                {user.role === "employee" && (
                  <li
                    className={
                      activeComponent === "employeeDashboard" ? "active" : ""
                    }
                    onClick={() => setActiveComponent("employeeDashboard")}
                  >
                    Employee Dashboard
                  </li>
                )}
                {user.role === "project_head" && (
                  <li
                    className={
                      activeComponent === "projectHeadDashboard" ? "active" : ""
                    }
                    onClick={() => setActiveComponent("projectHeadDashboard")}
                  >
                    Project Head Dashboard
                  </li>
                )}
                <li
                  className={activeComponent === "profile" ? "active" : ""}
                  onClick={() => setActiveComponent("profile")}
                >
                  Profile
                </li>
                <li
                  className={activeComponent === "settings" ? "active" : ""}
                  onClick={() => setActiveComponent("settings")}
                >
                  Settings
                </li>
                <li
                  className={activeComponent === "notifications" ? "active" : ""}
                  onClick={() => setActiveComponent("notifications")}
                >
                  Notifications
                </li>
                <li
                  className={activeComponent === "communication" ? "active" : ""}
                  onClick={() => setActiveComponent("communication")}
                >
                  Communication
                </li>
                <li
                  className={activeComponent === "department" ? "active" : ""}
                  onClick={() => setActiveComponent("department")}
                >
                  Department
                </li>
                <li
                  className={activeComponent === "news" ? "active" : ""}
                  onClick={() => setActiveComponent("news")}
                >
                  News
                </li>
                <li
                  className={activeComponent === "tasks" ? "active" : ""}
                  onClick={() => setActiveComponent("tasks")}
                >
                  Tasks
                </li>
                <li
                  className={activeComponent === "notices" ? "active" : ""}
                  onClick={() => setActiveComponent("notices")}
                >
                  Notices
                </li>
              </ul>
            </nav>

            <main className="main-content">{renderComponent()}</main>
          </div>
        </div>
      </SubModuleProvider>
    </TaskProvider>
  );
}

export default App;

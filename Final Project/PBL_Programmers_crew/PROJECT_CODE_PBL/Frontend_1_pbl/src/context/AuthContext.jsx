"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { loginUser, validateToken } from "../services/userService";

// Create the authentication context
const AuthContext = createContext();

// Create the task context
const TaskContext = createContext();

// Create the submodule context
const SubModuleContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Custom hook to use the task context
export const useTasks = () => useContext(TaskContext);

// Custom hook to use the submodule context
export const useSubModules = () => useContext(SubModuleContext);

// Provider component that wraps the app and makes auth object available to any child component that calls useAuth()
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user data from storage or API on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        localStorage.clear();  
        const token = localStorage.getItem("authToken");
        if (token) {
          const user = await validateToken(token);
          setUser(user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Token validation error:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const { user, token } = await loginUser(email, password);
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      // In a real app, call your backend API
      // await fetch('/api/auth/logout', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      //   }
      // });

      localStorage.removeItem("user");
      localStorage.removeItem("authToken");
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const hasPermission = (permission) => {
    return user?.permissions?.includes(permission) || false;
  };

  const hasRole = (role) => {
    if (Array.isArray(role)) {
      return role.includes(user?.role);
    }
    return user?.role === role;
  };

  // Context value that will be supplied to any descendants of this provider
  const value = {
    user,
    loading,
    login,
    logout,
    hasPermission,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Provider component that wraps the app and makes task object available to any child component that calls useTasks()
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([
    { text: 'Complete project documentation', completed: false },
    { text: 'Review team performance', completed: true },
    { text: 'Plan next sprint', completed: false },
  ]);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

// Provider component that wraps the app and makes submodule object available to any child component that calls useSubModules()
export const SubModuleProvider = ({ children }) => {
  const { user } = useAuth();

  const departmentHeadModules = [
    { name: 'Project 1', description: 'Road construction' },
    { name: 'Project 2', description: 'Bridge construction' },
  ];

  const projectHeadModules = [
    { name: 'Project phase 1', description: 'bridge foundation building' },
    { name: 'Project phase 2', description: 'bridge pillar construction' },
  ];

  const employeeModules = [
    { name: 'Project phase 1', description: 'Inspecting tools required for bridge construction' },
    { name: 'Project phase 2', description: 'Testing cement quality' },
  ];

  const [subModules, setSubModules] = useState(
    user?.role === 'department_head'
      ? departmentHeadModules
      : user?.role === 'project_head'
      ? projectHeadModules
      : employeeModules
  );

  useEffect(() => {
    setSubModules(
      user?.role === 'department_head'
        ? departmentHeadModules
        : user?.role === 'project_head'
        ? projectHeadModules
        : employeeModules
    );
  }, [user]);

  return (
    <SubModuleContext.Provider value={{ subModules, setSubModules }}>
      {children}
    </SubModuleContext.Provider>
  );
};


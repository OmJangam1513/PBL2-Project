// Mock user data for testing purposes
const mockUsers = [
  {
    id: "1",
    name: "Amit Gupta",
    email: "Amitgupta@example.com",
    role: "department_head",
    departmentId: "101",
    permissions: ["view_all", "edit_all", "admin"],
  },
  {
    id: "2",
    name: "Rohan Sharma",
    email: "Rohansharma@example.com",
    role: "project_head",
    departmentId: "102",
    permissions: ["view_projects", "edit_projects"],
  },
  {
    id: "3",
    name: "Yash Sharma",
    email: "Yashsharma@example.com",
    role: "employee",
    departmentId: "103",
    permissions: ["view_tasks"],
  },
];

/**
 * Simulates a login by checking the email and returning the corresponding user.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user (mocked, not validated).
 * @returns {Promise<{user: object, token: string}>} - The user and a mock token.
 */
export const loginUser = async (email, password) => {
  const user = mockUsers.find((u) => u.email === email);
  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Return the user and a mock token
  return {
    user,
    token: "mock-jwt-token",
  };
};

/**
 * Validates a token and returns the corresponding user.
 * @param {string} token - The token to validate.
 * @returns {Promise<object>} - The user associated with the token.
 */
export const validateToken = async (token) => {
  if (token !== "mock-jwt-token") {
    throw new Error("Invalid token");
  }

  // Retrieve user from localStorage for mock behavior
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    return JSON.parse(storedUser);
  }

  throw new Error("User not found");
};
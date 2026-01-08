// API layer for department

/**
 * Fetches department information from the backend
 *
 * @param {string} departmentId - The ID of the department
 * @returns {Promise<Object>} - The department information
 *
 */
export const getDepartmentInfoAPI = async (departmentId) => {
  const response = await fetch(`/api/departments/${departmentId}`)
  if (!response.ok) throw new Error("Failed to fetch department info")
  return await response.json()
}


import { getDepartmentInfoAPI } from "../api/departmentAPI"
import mockDepartment from "../mockData/department.json"

// Service to handle department data with fallback to mock data
export const getDepartmentInfo = async (departmentId) => {
  try {
    const data = await getDepartmentInfoAPI(departmentId)
    return data
  } catch (error) {
    console.log("API call failed, using mock data instead:", error)
    return mockDepartment
  }
}


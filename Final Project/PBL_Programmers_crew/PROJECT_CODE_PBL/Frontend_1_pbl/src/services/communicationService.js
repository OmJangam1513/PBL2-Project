import { getCommunicationsAPI } from "../api/communicationAPI"
import mockCommunications from "../mockData/communication.json"

// Service to handle communication data with fallback to mock data
export const getCommunications = async (userId) => {
  try {
    const data = await getCommunicationsAPI(userId)
    return data
  } catch (error) {
    console.log("API call failed, using mock data instead:", error)
    return mockCommunications
  }
}

import { getSettingsAPI, updateSettingsAPI } from "../api/settingsAPI"
import mockSettings from "../mockData/settings.json"

// Service to handle settings data with fallback to mock data
export const getSettings = async (userId) => {
  try {
    const data = await getSettingsAPI(userId)
    return data
  } catch (error) {
    console.log("API call failed, using mock data instead:", error)
    return mockSettings
  }
}

export const updateSettings = async (userId, settingsData) => {
  try {
    const data = await updateSettingsAPI(userId, settingsData)
    return data
  } catch (error) {
    console.log("API call failed, using mock data instead:", error)
    return { ...mockSettings, ...settingsData }
  }
}

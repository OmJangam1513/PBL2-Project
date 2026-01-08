import { getProfileAPI, updateProfileAPI } from "../api/profilesAPI"
import mockProfiles from "../mockData/profiles.json"

// Service to handle profile data with fallback to mock data
// Update the getProfile function to filter data based on the user's role
export const getProfile = async (userId, userRole) => {
  try {
    const data = await getProfileAPI(userId);

    // Filter profile data based on role
    if (userRole === "department_head") {
      return {
        personalDetails: data.personalDetails,
        department: data.department,
        projectsAssigned: data.projectsAssigned,
        about: data.about,
      };
    } else if (userRole === "project_head") {
      return {
        personalDetails: data.personalDetails,
        projectsAssigned: data.projectsAssigned,
        skills: data.skills,
      };
    } else if (userRole === "employee") {
      return {
        personalDetails: data.personalDetails,
        skills: data.skills,
        pastExperience: data.pastExperience,
      };
    } else {
      return data; // Default to full profile for unknown roles
    }
  } catch (error) {
    console.log("API call failed, using mock data instead:", error);

    // Fallback to mock data with role-based filtering
    const mockData = mockProfiles[userRole];
    if (mockData) {
      return mockData;
    } else {
      return mockProfiles; // Default to full profile for unknown roles
    }
  }
};

export const updateProfile = async (userId, profileData) => {
  try {
    const data = await updateProfileAPI(userId, profileData)
    return data
  } catch (error) {
    console.log("API call failed, using mock data instead:", error)
    console.log("Profile update would be sent to database:", profileData)
    return { ...mockProfiles, ...profileData }
  }
}


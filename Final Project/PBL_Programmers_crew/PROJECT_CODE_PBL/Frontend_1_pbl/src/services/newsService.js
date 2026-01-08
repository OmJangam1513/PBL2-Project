import { getNewsAPI } from "../api/newsAPI";
import mockNews from "../mockData/news.json";

// Service to handle news data with fallback to mock data
export const getNews = async (userId) => {
  try {
    const data = await getNewsAPI(userId);
    return data;
  } catch (error) {
    console.log("API call failed, using mock data instead:", error);
    return mockNews;
  }
};
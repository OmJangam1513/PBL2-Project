// Utility for making API calls


// Base API URL - would come from environment variables in a real app
const API_BASE_URL = "http://localhost:3000/api"

// Default request options
const defaultOptions = {
  headers: {
    "Content-Type": "application/json",
  },
}

/**
 * Adds authentication token to request headers
 *
 * @param {Object} options - Request options
 * @returns {Object} - Options with auth token
 */
const addAuthToken = (options) => {
  const token = localStorage.getItem("authToken")

  if (token) {
    return {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    }
  }

  return options
}

/**
 * Handles API responses consistently
 *
 * @param {Response} response - Fetch API response
 * @returns {Promise<any>} - Parsed response data
 * @throws {Error} - If response is not ok
 */
const handleResponse = async (response) => {
  if (!response.ok) {
    let errorMessage
    try {
      const errorData = await response.json()
      errorMessage = errorData.message || `Error: ${response.status}`
    } catch (e) {
      errorMessage = `Error: ${response.status}`
    }

    throw new Error(errorMessage)
  }

  const contentType = response.headers.get("content-type")
  if (contentType && contentType.includes("application/json")) {
    return await response.json()
  }

  return await response.text()
}

export const apiClient = {
  /**
   * Performs a GET request
   *
   * @param {string} endpoint - API endpoint path
   * @param {Object} options - Additional fetch options
   * @returns {Promise<any>} - Response data
   */
  get: async (endpoint, options = {}) => {
    try {
      const url = `${API_BASE_URL}${endpoint}`
      const authOptions = addAuthToken({
        ...defaultOptions,
        ...options,
        method: "GET",
      })

      const response = await fetch(url, authOptions)
      return await handleResponse(response)
    } catch (error) {
      console.error(`GET request failed for ${endpoint}:`, error)
      throw error
    }
  },

  /**
   * Performs a POST request
   *
   * @param {string} endpoint - API endpoint path
   * @param {Object} data - Request body data
   * @param {Object} options - Additional fetch options
   * @returns {Promise<any>} - Response data
   */
  post: async (endpoint, data, options = {}) => {
    try {
      const url = `${API_BASE_URL}${endpoint}`
      const authOptions = addAuthToken({
        ...defaultOptions,
        ...options,
        method: "POST",
        body: JSON.stringify(data),
      })

      const response = await fetch(url, authOptions)
      return await handleResponse(response)
    } catch (error) {
      console.error(`POST request failed for ${endpoint}:`, error)
      throw error
    }
  },

  /**
   * Performs a PUT request
   *
   * @param {string} endpoint - API endpoint path
   * @param {Object} data - Request body data
   * @param {Object} options - Additional fetch options
   * @returns {Promise<any>} - Response data
   */
  put: async (endpoint, data, options = {}) => {
    try {
      const url = `${API_BASE_URL}${endpoint}`
      const authOptions = addAuthToken({
        ...defaultOptions,
        ...options,
        method: "PUT",
        body: JSON.stringify(data),
      })

      const response = await fetch(url, authOptions)
      return await handleResponse(response)
    } catch (error) {
      console.error(`PUT request failed for ${endpoint}:`, error)
      throw error
    }
  },

  /**
   * Performs a PATCH request
   *
   * @param {string} endpoint - API endpoint path
   * @param {Object} data - Request body data
   * @param {Object} options - Additional fetch options
   * @returns {Promise<any>} - Response data
   */
  patch: async (endpoint, data, options = {}) => {
    try {
      const url = `${API_BASE_URL}${endpoint}`
      const authOptions = addAuthToken({
        ...defaultOptions,
        ...options,
        method: "PATCH",
        body: JSON.stringify(data),
      })

      const response = await fetch(url, authOptions)
      return await handleResponse(response)
    } catch (error) {
      console.error(`PATCH request failed for ${endpoint}:`, error)
      throw error
    }
  },

  /**
   * Performs a DELETE request
   *
   * @param {string} endpoint - API endpoint path
   * @param {Object} options - Additional fetch options
   * @returns {Promise<any>} - Response data
   */
  delete: async (endpoint, options = {}) => {
    try {
      const url = `${API_BASE_URL}${endpoint}`
      const authOptions = addAuthToken({
        ...defaultOptions,
        ...options,
        method: "DELETE",
      })

      const response = await fetch(url, authOptions)
      return await handleResponse(response)
    } catch (error) {
      console.error(`DELETE request failed for ${endpoint}:`, error)
      throw error
    }
  },
}


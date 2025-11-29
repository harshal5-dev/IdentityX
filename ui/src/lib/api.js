import { store } from "@/store/store";

const API_BASE_URL = "http://localhost:8080/api";

// Helper function to get user-friendly error messages
const getUserFriendlyMessage = (errorMessage, errorCode, statusCode) => {
  // Handle 500 Internal Server Error
  if (statusCode === 500 || errorCode === "INTERNAL_SERVER_ERROR") {
    return "Something went wrong on our end. Please try again in a few moments. If the problem persists, contact support.";
  }

  // Handle network errors
  if (errorCode === "NETWORK_ERROR") {
    return "Unable to connect to the server. Please check your internet connection and try again.";
  }

  // For other errors, use the error message from API (it's usually user-friendly)
  return errorMessage;
};

/**
 * Makes an authenticated API request with automatic token refresh
 * @param {string} url - API endpoint
 * @param {object} options - Fetch options
 * @returns {Promise<Response>}
 */
export const authenticatedFetch = async (url, options = {}) => {
  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    credentials: "include", // Always include cookies
    ...options,
  };

  try {
    // First attempt
    let response = await fetch(`${API_BASE_URL}${url}`, defaultOptions);

    // If 401 Unauthorized, try to refresh token
    if (response.status === 401) {
      // const refreshResult = await store.dispatch(refreshAccessToken());
      // If refresh successful, retry the original request
      // if (refreshAccessToken.fulfilled.match(refreshResult)) {
      //   response = await fetch(`${API_BASE_URL}${url}`, defaultOptions);
      // } else {
      //   // Refresh failed, logout user
      //   store.dispatch(logoutUser());
      //   throw new Error("Session expired. Please login again.");
      // }
    }

    return response;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};

/**
 * Helper function to make GET requests
 * @throws {Object} API error response with errorMessage, errorCode, validationErrors
 */
export const apiGet = async (url) => {
  const response = await authenticatedFetch(url, { method: "GET" });
  const data = await response.json();

  if (!response.ok) {
    const errorMessage = data.errorMessage || data.message || "Request failed";
    const errorCode = data.errorCode || "UNKNOWN_ERROR";

    throw {
      errorMessage: getUserFriendlyMessage(
        errorMessage,
        errorCode,
        response.status
      ),
      errorCode: errorCode,
      validationErrors: data.validationErrors || null,
      apiPath: data.apiPath || url,
      statusCode: response.status,
    };
  }

  return data;
};

/**
 * Helper function to make POST requests
 * @throws {Object} API error response with errorMessage, errorCode, validationErrors
 */
export const apiPost = async (url, data) => {
  const response = await authenticatedFetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  });
  const responseData = await response.json();

  if (!response.ok) {
    const errorMessage =
      responseData.errorMessage || responseData.message || "Request failed";
    const errorCode = responseData.errorCode || "UNKNOWN_ERROR";

    throw {
      errorMessage: getUserFriendlyMessage(
        errorMessage,
        errorCode,
        response.status
      ),
      errorCode: errorCode,
      validationErrors: responseData.validationErrors || null,
      apiPath: responseData.apiPath || url,
      statusCode: response.status,
    };
  }

  return responseData;
};

/**
 * Helper function to make PUT requests
 * @throws {Object} API error response with errorMessage, errorCode, validationErrors
 */
export const apiPut = async (url, data) => {
  const response = await authenticatedFetch(url, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  const responseData = await response.json();

  if (!response.ok) {
    const errorMessage =
      responseData.errorMessage || responseData.message || "Request failed";
    const errorCode = responseData.errorCode || "UNKNOWN_ERROR";

    throw {
      errorMessage: getUserFriendlyMessage(
        errorMessage,
        errorCode,
        response.status
      ),
      errorCode: errorCode,
      validationErrors: responseData.validationErrors || null,
      apiPath: responseData.apiPath || url,
      statusCode: response.status,
    };
  }

  return responseData;
};

/**
 * Helper function to make DELETE requests
 * @throws {Object} API error response with errorMessage, errorCode, validationErrors
 */
export const apiDelete = async (url) => {
  const response = await authenticatedFetch(url, { method: "DELETE" });
  const data = await response.json();

  if (!response.ok) {
    const errorMessage = data.errorMessage || data.message || "Request failed";
    const errorCode = data.errorCode || "UNKNOWN_ERROR";

    throw {
      errorMessage: getUserFriendlyMessage(
        errorMessage,
        errorCode,
        response.status
      ),
      errorCode: errorCode,
      validationErrors: data.validationErrors || null,
      apiPath: data.apiPath || url,
      statusCode: response.status,
    };
  }

  return data;
};

export default {
  authenticatedFetch,
  apiGet,
  apiPost,
  apiPut,
  apiDelete,
};

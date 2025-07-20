const apiErrorHandler = (error) => {
  let message = "Something went wrong";

  // Axios Error Shape
  if (error?.response) {
    // Server responded with a status other than 2xx
    message = error.response.data?.message || error.response.statusText;
    console.error("API Error Response:", {
      status: error.response.status,
      url: error.config?.url,
      method: error.config?.method,
      data: error.response.data,
    });
  } else if (error?.request) {
    // Request was made, but no response received
    message = "No response from server. Please check your connection.";
    console.error("API Error Request:", error.request);
  } else {
    // Something else caused the error
    message = error.message;
    console.error("API Error Message:", error.message);
  }

  return {
    message,
    status: error?.response?.status,
    raw: error,
  };
};

export default apiErrorHandler;

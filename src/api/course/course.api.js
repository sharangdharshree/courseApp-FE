import apiErrorHandler from "../../utils/apiErrorHandler.js";
import axios from "../axiosInstance.js";

const getCourseContent = async (courseId) => {
  try {
    return await axios.get(`/course/${courseId}/learn`);
  } catch (error) {
    throw apiErrorHandler(error);
  }
};

export { getCourseContent };


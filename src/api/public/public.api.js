import apiErrorHandler from "../../utils/apiErrorHandler.js";
import axios from "../axiosInstance.js";

const getAllCourses = async () => {
  try {
    return await axios.get("/public/all-courses");
  } catch (error) {
    throw apiErrorHandler(error);
  }
};

const getCourse = async (courseId) => {
  try {
    return await axios.get(`/public/all-courses/${courseId}`);
  } catch (error) {
    throw apiErrorHandler(error);
  }
};

export { getAllCourses, getCourse };

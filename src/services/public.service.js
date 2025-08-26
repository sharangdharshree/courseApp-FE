import apiErrorHandler from "../utils/apiErrorHandler.js";
import { getCourse, getAllCourses } from "../api/public/public.api.js";

const courseFetchService = async (courseId) => {
  try {
    const response = await getCourse(courseId);
    //console.log(response);
    return response.data.data;
  } catch (error) {
    throw apiErrorHandler(error);
  }
};

const allCoursesFetchService = async () => {
  try {
    const response = await getAllCourses();
    //console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    throw apiErrorHandler(error);
  }
};

export { courseFetchService, allCoursesFetchService };

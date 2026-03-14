import apiErrorHandler from "../utils/apiErrorHandler.js";
import { getCourseContent } from "../api/course/course.api.js";

const courseContentFetchService = async (courseId) => {
  try {
    const response = await getCourseContent(courseId);
    return response.data.data?.course;
  } catch (error) {
    throw apiErrorHandler(error);
  }
};

export { courseContentFetchService };

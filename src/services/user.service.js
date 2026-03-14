import apiErrorHandler from "../utils/apiErrorHandler.js";
import { getPurchasedCourses } from "../api/user/user.api.js";

const purchasedCoursesFetchService = async () => {
  try {
    const response = await getPurchasedCourses();
    return response.data.data;
  } catch (error) {
    throw apiErrorHandler(error);
  }
};

export { purchasedCoursesFetchService };

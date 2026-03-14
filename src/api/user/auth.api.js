import apiErrorHandler from "../../utils/apiErrorHandler.js";
import axios from "../axiosInstance.js";

const userLogin = async (credentials) => {
  try {
    return await axios.post("/user/login", credentials);
  } catch (error) {
    throw apiErrorHandler(error);
  }
};

const userLogout = async () => {
  try {
    return await axios.post("/user/logout");
  } catch (error) {
    throw apiErrorHandler(error);
  }
};

const userSignup = async (formdata) => {
  try {
    return await axios.post("/user/register", formdata);
  } catch (error) {
    throw apiErrorHandler(error);
  }
};

const refreshUserAccessToken = async () => {
  try {
    return await axios.post("/user/refresh-token");
  } catch (error) {
    throw apiErrorHandler(error);
  }
};

export { userLogin, userLogout, userSignup, refreshUserAccessToken };

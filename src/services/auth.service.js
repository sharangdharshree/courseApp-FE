import {
  userLogin,
  userLogout,
  userSignup,
  refreshUserAccessToken,
} from "../api/user/auth.api.js";

import apiErrorHandler from "../utils/apiErrorHandler.js";

// user auth services
const userLoginService = async (credentials) => {
  try {
    const response = await userLogin(credentials);
    return response.data;
  } catch (error) {
    throw apiErrorHandler(error);
  }
};

const userLogoutService = async () => {
  try {
    const response = await userLogout();
    return response.data;
  } catch (error) {
    throw apiErrorHandler(error);
  }
};

const userSignupService = async (formdata) => {
  try {
    const response = await userSignup(formdata);
    return response.data;
  } catch (error) {
    throw apiErrorHandler(error);
  }
};

const refreshUserAccessTokenService = async () => {
  try {
    const response = await refreshUserAccessToken();
    return response.data;
  } catch (error) {
    throw apiErrorHandler(error);
  }
};

export {
  userLoginService,
  userLogoutService,
  userSignupService,
  refreshUserAccessTokenService,
};

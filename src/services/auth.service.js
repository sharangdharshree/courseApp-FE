import {
  userLogin,
  userLogout,
  userSignup,
  refreshUserAccessToken,
} from "../api/user/auth.api.js";
import {
  adminLogin,
  adminLogout,
  adminSignup,
  refreshAdminAccessToken,
} from "../api/admin/auth.api.js";

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

  const userSignupService = async (formdata) => {};

  const refreshUserAccessTokenService = async () => {};

  // admin auth services
  const adminLoginService = async (credentials) => {};

  const adminLogoutService = async () => {};

  const refreshAdminAccessTokenService = async () => {};

  const adminSignupService = async (formdata) => {};
};

export {
  userLoginService,
  userLogoutService,
  // userSignupService,
  // refreshUserAccessTokenService,
  // adminLoginService,
  // adminLogoutService,
  // refreshAdminAccessTokenService,
  // adminSignupService,
};

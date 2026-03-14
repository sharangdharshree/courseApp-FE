import apiErrorHandler from "../../utils/apiErrorHandler.js";
import axios from "../axiosInstance.js";

const applyCoupon = async (courseId, code) => {
  try {
    return await axios.post(`/purchase/${courseId}/apply-coupon`, { code });
  } catch (error) {
    throw apiErrorHandler(error);
  }
};

const initiatePay = async (courseId, couponCode) => {
  try {
    return await axios.post(`/purchase/${courseId}/initiate-order`, {
      couponCode: couponCode || undefined,
    });
  } catch (error) {
    throw apiErrorHandler(error);
  }
};

const verifyPay = async (courseId, payload) => {
  try {
    return await axios.post(`/purchase/${courseId}/verify-payment`, payload);
  } catch (error) {
    throw apiErrorHandler(error);
  }
};

export { applyCoupon, initiatePay, verifyPay };

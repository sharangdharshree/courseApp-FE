import apiErrorHandler from "../utils/apiErrorHandler.js";
import {
  applyCoupon,
  initiatePay,
  verifyPay,
} from "../api/checkout/checkout.api.js";

const applyCouponService = async (courseId, code) => {
  try {
    const response = await applyCoupon(courseId, code);
    return response.data.data;
  } catch (error) {
    throw apiErrorHandler(error);
  }
};

const initiatePaymentService = async (courseId, couponCode) => {
  try {
    const response = await initiatePay(courseId, couponCode);
    return response.data.data;
  } catch (error) {
    throw apiErrorHandler(error);
  }
};

const verifyPaymentService = async (courseId, payload) => {
  try {
    const response = await verifyPay(courseId, payload);
    return response.data.data;
  } catch (error) {
    throw apiErrorHandler(error);
  }
};

export { applyCouponService, initiatePaymentService, verifyPaymentService };

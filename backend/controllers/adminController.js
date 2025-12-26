import createError from "http-errors";
import { errorResponse, successResponse } from "../helpers/responseHandler.js";
import foodItemModel from "../models/foodItemModel.js";
import orderModel from "../models/orderModel.js";
import { User } from "../models/userModel.js";

export const adminDashboardController = async (req, res, next) => {
  try {
    const orders = await orderModel.find().lean();
    const users = await User.find().lean();
    const products = await foodItemModel.find().lean();

    if (!orders) {
      errorResponse({ statusCode: 401, message: "Failed to Fetch Data" });
    }

    if (!users) {
      errorResponse({ statusCode: 401, message: "Failed to Fetch Users" });
    }
    if (!products) {
      errorResponse({ statusCode: 401, message: "Failed to Fetch Food items" });
    }
    successResponse(res, {
      statusCode: 200,
      message: "Successfully retrieve data",
      payload: { orders, users, products },
    });
  } catch (error) {
    next(createError(error));
  }
};

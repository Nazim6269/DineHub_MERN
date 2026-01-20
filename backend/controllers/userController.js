// External imports
import bcrypt from "bcryptjs";
import createError from "http-errors";
import mongoose from "mongoose";

// Internal imports
import { createJWT } from "../helpers/createJWT.js";
import emailWithNodemailer from "../helpers/emailWithNodemailer.js";
import { errorResponse, successResponse } from "../helpers/responseHandler.js";
import { User } from "../models/userModel.js";
import { jwtAccessKey, jwtSecretKey } from "../secret.js";

const signupGetController = (req, res) => {
  res.send("hi");
};
//====================google login controller=================//
const googleLoginController = async (req, res, next) => {
  const { name, email, googleId, picture } = req.body;
  const accessToken = createJWT({ email, googleId }, jwtAccessKey, "10m");

  try {
    const user = await User.findOne({ email });
    if (!user) {
      const hasedPassword = await bcrypt.hash(googleId, 10);

      const newUser = await User.create({
        name,
        email,
        picture,
        password: hasedPassword,
      });

      const response = await newUser.save();
      if (!response) {
        return errorResponse(res, {
          statusCode: 400,
          message: "Failed to sign up",
        });
      }
      successResponse(res, {
        statusCode: 201,
        message: "User Created Successfully",
        payload: accessToken,
      });
    } else {
      successResponse(res, {
        statusCode: 200,
        message: "User Exist with this email",
        payload: accessToken,
      });
    }
  } catch (error) {
    next(createError(error));
  }
};

//==============logout controller===============//
const logoutController = async (req, res, next) => {
  const { email } = req.body;
  const response = await User.findOneAndDelete(email);
  if (!response) {
    errorResponse(res, { statusCode: 400, message: "Failed To logout" });
  } else {
    successResponse(res, {
      statusCode: 200,
      message: "Successfully log out",
    });
  }
};

//===================signup POST controller=================//
const signupPostController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const isExist = await User.findOne({ email });

    if (isExist)
      return errorResponse(res, {
        statusCode: 400,
        message: "User already exist",
      });

    const hasedPassword = await bcrypt.hash(password, 10);
    const newToken = createJWT({ email, password }, jwtAccessKey, "10m");

    const newUser = await User.create({
      name,
      email,
      password: hasedPassword,
    });
    newUser.tokens.push({ token: newToken });

    const response = await newUser.save();
    if (!response) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Failed to sign up",
      });
    }

    const accessToken = createJWT({ email, password }, jwtAccessKey, "100m");

    successResponse(res, {
      statusCode: 201,
      message: "User Created Successfully",
      payload: accessToken,
    });
  } catch (error) {
    console.log(error);
  }
};

//=====================login POST controller==================//
const loginPostController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const isExist = await User.findOne({ email });
    if (!isExist) {
      return errorResponse(res, {
        statusCode: 400,
        message: "User doesnot exist. Please signup first",
      });
    }

    const isMatched = await bcrypt.compare(password, isExist.password);
    if (!isMatched) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Password did not match",
      });
    }

    //createToken
    const accessToken = createJWT({ email, password }, jwtAccessKey, "100m");

    const { password: _, tokens, ...userInfo } = isExist.toObject();

    return successResponse(res, {
      statusCode: 200,
      message: "Successfully login",
      payload: { accessToken, user: userInfo },
    });
  } catch (error) {
    return next(error);
  }
};

//food controller
const foodController = async (req, res, next) => {
  try {
    const foodItems = await mongoose.connection.db
      .collection("Food_items")
      .find({})
      .toArray();

    const foodCategory = await mongoose.connection.db
      .collection("Food_Category")
      .find({})
      .toArray();

    if (!foodCategory || !foodItems) {
      return errorResponse(res, {
        statusCode: 404,
        message: "Failed to fetched Data",
      });
    }

    return successResponse(res, {
      statusCode: 200,
      message: "Data successfylly fetched",
      payload: [foodCategory, foodItems],
    });
  } catch (error) {
    next(error);
  }
};

//forget password controller
const forgetPassController = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    errorResponse(res, {
      statusCode: 404,
      message: "User does not exist",
      success: false,
    });
  } else {
    const token = createJWT({ id: user._id, email }, jwtSecretKey, "1d");

    //emaildata
    const emailData = {
      email,
      subject: "Reset your password",
      html: `<a href="http://localhost:5173/reset-password?token=${token}&id=${user._id}" > Activate your account</a>`,
    };
    try {
      const info = await emailWithNodemailer(emailData);
      if (info.accepted.length > 0) {
        successResponse(res, {
          statusCode: 200,
          success: true,
          message: "Message sent your gmail",
        });
      } else {
        errorResponse(res, {
          statusCode: 400,
          success: false,
          message: "Failed to sent message",
        });
      }
    } catch (error) {
      next(createError(error));
    }
  }
};

//handele reset password
const resetPassController = async (req, res, next) => {
  try {
    const { newPass, confirmPass, id } = req.body;
    console.log(newPass, "==>", confirmPass);

    if (newPass !== confirmPass) {
      errorResponse(res, {
        statusCode: 400,
        success: false,
        message: "Your password didnot match",
      });
    } else {
      const isExist = await User.findById(id);
      if (!isExist) {
        errorResponse(res, {
          statusCode: 404,
          success: false,
          message: "User Not Found",
        });
      }
      const hasedPassword = await bcrypt.hash(confirmPass, 10);
      const response = await User.findByIdAndUpdate(
        id,
        {
          password: hasedPassword,
        },
        { new: true }
      );
      if (!response) {
        errorResponse(res, {
          statusCode: 400,
          success: false,
          message: "Failed to update password",
        });
      }
      successResponse(res, {
        statusCode: 201,
        success: true,
        message: "Successfully updated password",
      });
    }
  } catch (error) {
    next(createError(error));
  }
};

export {
  foodController,
  forgetPassController,
  googleLoginController,
  loginPostController,
  logoutController,
  resetPassController,
  signupGetController,
  signupPostController,
};

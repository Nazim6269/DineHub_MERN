// External imports
import bcrypt from "bcryptjs";
import createError from "http-errors";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// Internal imports
import { createJWT } from "../helpers/createJWT.js";
import { clearAuthCookies } from "../helpers/cookies.js";
import emailWithNodemailer from "../helpers/emailWithNodemailer.js";
import { errorResponse, successResponse } from "../helpers/responseHandler.js";
import { User } from "../models/userModel.js";
import "../models/foodItemModel.js"; // Import key to register model
import generateOTP from "../helpers/generateOTP.js";
import { frontendURL, jwtAccessKey, jwtSecretKey } from "../secret.js";

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
  try {
    // Clear authentication cookies
    clearAuthCookies(res);

    // Optional: Remove token from user's tokens array if needed
    // This prevents token reuse even if someone has the cookie value
    // if (req.user) {
    //   const token = req.cookies.accessToken;
    //   await User.findByIdAndUpdate(req.user._id, {
    //     $pull: { tokens: { token } },
    //   });
    // }

    return successResponse(res, {
      statusCode: 200,
      message: "Successfully logged out",
    });
  } catch (error) {
    next(createError(500, "Failed to logout"));
  }
};

//===================signup POST controller=================//
const signupPostController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const isExist = await User.findOne({ email });

    if (isExist && isExist.isEmailVerified) {
      return errorResponse(res, {
        statusCode: 400,
        message: "User already exist",
      });
    }

    // Generate OTP
    const otp = generateOTP();
    const hashedOTP = await bcrypt.hash(otp, 10);
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    if (isExist && !isExist.isEmailVerified) {
      // User exists but unverified — update their info and resend OTP
      const hasedPassword = await bcrypt.hash(password, 10);
      isExist.name = name;
      isExist.password = hasedPassword;
      isExist.otp = hashedOTP;
      isExist.otpExpiry = otpExpiry;
      await isExist.save();
    } else {
      // Create new user
      const hasedPassword = await bcrypt.hash(password, 10);
      await User.create({
        name,
        email,
        password: hasedPassword,
        isEmailVerified: false,
        otp: hashedOTP,
        otpExpiry,
      });
    }

    // Send OTP email
    const emailData = {
      email,
      subject: "Verify your DineHub account",
      html: `<div style="font-family:Arial,sans-serif;max-width:400px;margin:0 auto;padding:20px;text-align:center;">
        <h2 style="color:#0346d4;">DineHub</h2>
        <p>Your verification code is:</p>
        <h1 style="letter-spacing:8px;font-size:36px;color:#0346d4;margin:20px 0;">${otp}</h1>
        <p style="color:#666;">This code expires in 5 minutes.</p>
      </div>`,
    };

    await emailWithNodemailer(emailData);

    return successResponse(res, {
      statusCode: 201,
      message: "OTP sent to your email",
      payload: { email },
    });
  } catch (error) {
    next(error);
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

    if (!isExist.isEmailVerified) {
      return errorResponse(res, {
        statusCode: 403,
        message: "Please verify your email first",
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
    const accessToken = createJWT({ email }, jwtAccessKey, "100m");

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
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return errorResponse(res, {
        statusCode: 404,
        message: "User does not exist",
      });
    }

    // Generate OTP
    const otp = generateOTP();
    const hashedOTP = await bcrypt.hash(otp, 10);

    user.otp = hashedOTP;
    user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
    await user.save();

    const emailData = {
      email,
      subject: "Reset your DineHub password",
      html: `<div style="font-family:Arial,sans-serif;max-width:400px;margin:0 auto;padding:20px;text-align:center;">
        <h2 style="color:#0346d4;">DineHub</h2>
        <p>Your password reset code is:</p>
        <h1 style="letter-spacing:8px;font-size:36px;color:#0346d4;margin:20px 0;">${otp}</h1>
        <p style="color:#666;">This code expires in 5 minutes.</p>
      </div>`,
    };

    await emailWithNodemailer(emailData);

    return successResponse(res, {
      statusCode: 200,
      message: "OTP sent to your email",
    });
  } catch (error) {
    next(error);
  }
};

//handele reset password
const resetPassController = async (req, res, next) => {
  try {
    const { email, resetToken, newPass, confirmPass } = req.body;

    // Verify reset token
    if (!resetToken) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Reset token is required",
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(resetToken, jwtSecretKey);
    } catch (tokenError) {
      return errorResponse(res, {
        statusCode: 401,
        message: "Session expired. Please request a new OTP.",
      });
    }

    if (decoded.email !== email) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Invalid reset request",
      });
    }

    if (newPass !== confirmPass) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Passwords do not match",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse(res, {
        statusCode: 404,
        message: "User not found",
      });
    }

    user.password = await bcrypt.hash(confirmPass, 10);
    await user.save();

    return successResponse(res, {
      statusCode: 200,
      message: "Password updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

//verify signup OTP controller
const verifySignupOTPController = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse(res, {
        statusCode: 404,
        message: "User not found",
      });
    }

    if (!user.otp || !user.otpExpiry) {
      return errorResponse(res, {
        statusCode: 400,
        message: "No OTP found. Please request a new one.",
      });
    }

    if (new Date() > user.otpExpiry) {
      return errorResponse(res, {
        statusCode: 400,
        message: "OTP has expired. Please request a new one.",
      });
    }

    const isMatch = await bcrypt.compare(otp, user.otp);
    if (!isMatch) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Invalid OTP",
      });
    }

    // Mark as verified and clear OTP
    user.isEmailVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    const accessToken = createJWT({ email }, jwtAccessKey, "100m");
    const { password: _, tokens, otp: __, otpExpiry: ___, ...userInfo } = user.toObject();

    return successResponse(res, {
      statusCode: 200,
      message: "Email verified successfully",
      payload: { accessToken, user: userInfo },
    });
  } catch (error) {
    next(error);
  }
};

//verify reset OTP controller
const verifyResetOTPController = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse(res, {
        statusCode: 404,
        message: "User not found",
      });
    }

    if (!user.otp || !user.otpExpiry) {
      return errorResponse(res, {
        statusCode: 400,
        message: "No OTP found. Please request a new one.",
      });
    }

    if (new Date() > user.otpExpiry) {
      return errorResponse(res, {
        statusCode: 400,
        message: "OTP has expired. Please request a new one.",
      });
    }

    const isMatch = await bcrypt.compare(otp, user.otp);
    if (!isMatch) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Invalid OTP",
      });
    }

    // Clear OTP and generate short-lived reset token
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    const resetToken = createJWT({ email, purpose: "reset" }, jwtSecretKey, "10m");

    return successResponse(res, {
      statusCode: 200,
      message: "OTP verified successfully",
      payload: { resetToken },
    });
  } catch (error) {
    next(error);
  }
};

//login OTP controller - sends OTP to verified user for passwordless login
const loginOTPController = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse(res, {
        statusCode: 404,
        message: "User does not exist. Please signup first.",
      });
    }

    if (!user.isEmailVerified) {
      return errorResponse(res, {
        statusCode: 403,
        message: "Please verify your email first",
      });
    }

    const otp = generateOTP();
    const hashedOTP = await bcrypt.hash(otp, 10);

    user.otp = hashedOTP;
    user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
    await user.save();

    const emailData = {
      email,
      subject: "Login to your DineHub account",
      html: `<div style="font-family:Arial,sans-serif;max-width:400px;margin:0 auto;padding:20px;text-align:center;">
        <h2 style="color:#0346d4;">DineHub</h2>
        <p>Your login verification code is:</p>
        <h1 style="letter-spacing:8px;font-size:36px;color:#0346d4;margin:20px 0;">${otp}</h1>
        <p style="color:#666;">This code expires in 5 minutes.</p>
      </div>`,
    };

    await emailWithNodemailer(emailData);

    return successResponse(res, {
      statusCode: 200,
      message: "OTP sent to your email",
    });
  } catch (error) {
    next(error);
  }
};

//verify login OTP controller
const verifyLoginOTPController = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse(res, {
        statusCode: 404,
        message: "User not found",
      });
    }

    if (!user.otp || !user.otpExpiry) {
      return errorResponse(res, {
        statusCode: 400,
        message: "No OTP found. Please request a new one.",
      });
    }

    if (new Date() > user.otpExpiry) {
      return errorResponse(res, {
        statusCode: 400,
        message: "OTP has expired. Please request a new one.",
      });
    }

    const isMatch = await bcrypt.compare(otp, user.otp);
    if (!isMatch) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Invalid OTP",
      });
    }

    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    const accessToken = createJWT({ email }, jwtAccessKey, "100m");
    const { password: _, tokens, otp: __, otpExpiry: ___, ...userInfo } = user.toObject();

    return successResponse(res, {
      statusCode: 200,
      message: "Successfully logged in",
      payload: { accessToken, user: userInfo },
    });
  } catch (error) {
    next(error);
  }
};

//resend OTP controller
const resendOTPController = async (req, res, next) => {
  try {
    const { email, type } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse(res, {
        statusCode: 404,
        message: "User not found",
      });
    }

    const otp = generateOTP();
    const hashedOTP = await bcrypt.hash(otp, 10);

    user.otp = hashedOTP;
    user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
    await user.save();

    const subjects = {
      signup: "Verify your DineHub account",
      reset: "Reset your DineHub password",
      login: "Login to your DineHub account",
    };
    const subject = subjects[type] || "Your DineHub verification code";

    const emailData = {
      email,
      subject,
      html: `<div style="font-family:Arial,sans-serif;max-width:400px;margin:0 auto;padding:20px;text-align:center;">
        <h2 style="color:#0346d4;">DineHub</h2>
        <p>Your verification code is:</p>
        <h1 style="letter-spacing:8px;font-size:36px;color:#0346d4;margin:20px 0;">${otp}</h1>
        <p style="color:#666;">This code expires in 5 minutes.</p>
      </div>`,
    };

    await emailWithNodemailer(emailData);

    return successResponse(res, {
      statusCode: 200,
      message: "OTP resent to your email",
    });
  } catch (error) {
    next(error);
  }
};

// Add review controller
const addReviewController = async (req, res, next) => {
  try {
    const { rating, comment, user_id, name } = req.body;
    const { id } = req.params;

    const FoodItem = mongoose.model("FoodItems"); // Assuming it's registered

    const foodItem = await FoodItem.findById(id);

    if (!foodItem) {
      return errorResponse(res, {
        statusCode: 404,
        message: "Food item not found",
      });
    }

    const review = {
      user: user_id,
      name: name,
      rating: Number(rating),
      comment,
    };

    foodItem.reviews.push(review);
    await foodItem.save();

    return successResponse(res, {
      statusCode: 201,
      message: "Review added successfully",
      payload: foodItem,
    });
  } catch (error) {
    next(error);
  }
};

export {
  foodController,
  forgetPassController,
  googleLoginController,
  loginPostController,
  loginOTPController,
  logoutController,
  resendOTPController,
  resetPassController,
  signupGetController,
  signupPostController,
  verifyLoginOTPController,
  verifyResetOTPController,
  verifySignupOTPController,
  addReviewController,
};

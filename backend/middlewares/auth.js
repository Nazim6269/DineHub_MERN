import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import { jwtAccessKey } from "../secret.js";

//========== this is protect route middleware=================//
const protect = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message:
          "You are not logged in. Please log in to access this resource.",
      });
    }

    console.log("token");
    const decoded = jwt.verify(token, jwtAccessKey);
    const currentUser = await User.findOne({ email: decoded.email }); //TODO: find by token

    if (!currentUser) {
      return res.status(401).json({
        success: false,
        message: "The user belonging to this token no longer exists.",
      });
    }

    if (!currentUser.isActive) {
      return res.status(401).json({
        success: false,
        message: "Your account has been deactivated.",
      });
    }

    req.user = currentUser;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token. Please log in again.",
      });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Your token has expired. Please log in again.",
      });
    }

    return res.status(401).json({
      success: false,
      message: "Authentication failed.",
    });
  }
};

//========== this is authorize middleware ==============//
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated.",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. User role '${
          req.user.role
        }' is not authorized to access this route. Required role(s): ${roles.join(
          ", "
        )}`,
      });
    }

    next();
  };
};

export { authorize, protect };

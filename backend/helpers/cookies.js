/**
 * Sets a secure access token cookie
 * @param {Object} res - Express response object
 * @param {string} accessToken - JWT access token
 */
const setAccessTokenCookie = (res, accessToken) => {
  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("accessToken", accessToken, {
    maxAge: 100 * 60 * 1000, // 100 minutes (matches JWT expiry)
    httpOnly: true, // Prevents XSS attacks
    secure: isProduction, // HTTPS only in production
    sameSite: isProduction ? "none" : "lax", // CSRF protection
    path: "/", // Cookie available for all routes
  });
};

/**
 * Sets a secure refresh token cookie
 * @param {Object} res - Express response object
 * @param {string} refreshToken - JWT refresh token
 */
const setRefreshTokenCookie = (res, refreshToken) => {
  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("refreshToken", refreshToken, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true, // Prevents XSS attacks
    secure: isProduction, // HTTPS only in production
    sameSite: isProduction ? "none" : "lax", // CSRF protection
    path: "/", // Cookie available for all routes
  });
};

/**
 * Clears authentication cookies
 * @param {Object} res - Express response object
 */
const clearAuthCookies = (res) => {
  const isProduction = process.env.NODE_ENV === "production";

  const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    path: "/",
  };

  res.clearCookie("accessToken", cookieOptions);
  res.clearCookie("refreshToken", cookieOptions);
};

export { setAccessTokenCookie, setRefreshTokenCookie, clearAuthCookies };

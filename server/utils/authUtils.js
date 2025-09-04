import jwt from "jsonwebtoken";
import logger from "./logger.js";

// Use different secrets for access and refresh tokens
const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_SEC_KEY || "access_secret";
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SEC_KEY || "refresh_secret";

// Token expiration times
const ACCESS_TOKEN_EXPIRE = process.env.JWT_ACCESS_EXPIRE || "15m";
const REFRESH_TOKEN_EXPIRE = process.env.JWT_REFRESH_EXPIRE || "7d";

export const generateTokens = (user) => {
  const payload = { 
    id: user._id,
    role: user.role || "user" // Add any additional claims needed
  };
  
  const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRE
  });
  
  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRE
  });
  
  return { accessToken, refreshToken };
};

export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, ACCESS_TOKEN_SECRET);
  } catch (error) {
    logger.error(`Access token verification failed: ${error.message}`);
    throw new Error('Invalid or expired access token');
  }
};

export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, REFRESH_TOKEN_SECRET);
  } catch (error) {
    logger.error(`Refresh token verification failed: ${error.message}`);
    throw new Error('Invalid or expired refresh token');
  }
};

export const setTokenCookies = (res, accessToken, refreshToken) => {
  const isProduction = process.env.NODE_ENV === 'production';
  
  // Access token cookie options
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'strict' : 'lax',
    maxAge: 15 * 60 * 1000, // 15 minutes
    path: '/',
  });
  
  // Refresh token cookie options (more secure)
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'strict' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: '/api/v1/auth/refresh', // Only sent to refresh endpoint
  });
};

export const clearTokenCookies = (res) => {
  res.clearCookie('accessToken', {
    httpOnly: true,
    path: '/',
  });
  
  res.clearCookie('refreshToken', {
    httpOnly: true,
    path: '/api/v1/auth/refresh',
  });
};
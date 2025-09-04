import validator from "validator";
// import logger from "./logger.js";

export const validateRegisterInput = (data) => {
  const errors = {};
  
  // Name validation
  if (!data.name || !validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }
  
  // Email validation
  if (!data.email || !validator.isEmail(data.email)) {
    errors.email = "Valid email is required";
  }
  
  // Password validation
  if (!data.password || !validator.isLength(data.password, { min: 6 })) {
    errors.password = "Password must be at least 6 characters";
  }
  
  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};

export const validateLoginInput = (data) => {
  const errors = {};
  
  // Email validation
  if (!data.email || !validator.isEmail(data.email)) {
    errors.email = "Valid email is required";
  }
  
  // Password validation
  if (!data.password) {
    errors.password = "Password is required";
  }
  
  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
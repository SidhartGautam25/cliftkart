import handleAsyncError from "../middlewares/handleAsyncError.js";
import User from "../models/User.js";
import HandleError from "../utils/handleError.js";
// import { sendToken } from "../utils/jwt.js";
import { sendToken } from "../utils/jwt_2.js";
import { generateTokens, verifyRefreshToken } from "../utils/jwt_2.js";
import {
  findCartItem,
  getUser,
  updateCartItemQuantity,
} from "../utils/userUtility.js";
import twilio from "twilio"

// export const refreshToken = handleAsyncError(async (req, res, next) => {
//   console.log("you are in refresh token controller");
//   const { refreshToken } = req.cookies;
//   if (!refreshToken) {
//     return next(new HandleError("Refresh Token not found ", 401));
//   }
//   const decodedData = verifyRefreshToken(refreshToken);
//   const user = await User.findById(decodedData.id);

//   if (!user) {
//     return next(new HandleError("User not found", 404));
//   }

//   const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
//     generateTokens(user);

//   const accessTokenOptions = {
//     expires: new Date(
//       Date.now() + (process.env.JWT_ACCESS_COOKIE_EXPIRE || 15) * 60 * 1000
//     ),
//     httpOnly: true,
//     // secure: process.env.NODE_ENV === "production",
//     // sameSite: "strict",
//   };

//   const refreshTokenOptions = {
//     expires: new Date(
//       Date.now() +
//       (process.env.JWT_REFRESH_COOKIE_EXPIRE || 7) * 24 * 60 * 60 * 1000
//     ),
//     httpOnly: true,
//     // secure: process.env.NODE_ENV === "production",
//     // sameSite: "strict",
//   };

//   res
//     .status(200)
//     .cookie("accessToken", newAccessToken, accessTokenOptions)
//     .cookie("refreshToken", newRefreshToken, refreshTokenOptions)
//     .json({
//       success: true,
//       message: "Token refreshed successfully",
//       accessToken: newAccessToken,
//     });
// });


export const refreshToken = handleAsyncError(async (req, res, next) => {
  console.log("in refresh token function and we will try to refresh your token now")
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return next(new HandleError("Authentication required - No refresh token provided", 401));
  }

  try {
    // Verify the refresh token
    const decodedData = verifyRefreshToken(refreshToken);
    const user = await User.findById(decodedData.id);

    if (!user) {
      return next(new HandleError("User not found", 404));
    }

    // Check for token reuse
    if (user.invalidatedTokens?.includes(refreshToken)) {
      // Clear all tokens as security measure
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');
      return next(new HandleError("Security alert: Potential token reuse detected", 401));
    }

    // Generate new tokens
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      generateTokens(user);

    // Invalidate the old refresh token
    await User.findByIdAndUpdate(user._id, {
      $push: { invalidatedTokens: refreshToken }
    });

    // Cookie options
    const isProduction = process.env.NODE_ENV === 'production';
    const cookieDomain = isProduction ? '.cliftkart.com' : undefined;

    // Access token cookie (short-lived)
    const accessTokenOptions = {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      domain: cookieDomain,
      maxAge: (process.env.JWT_ACCESS_COOKIE_EXPIRE || 1) * 60 * 1000, // 15 mins
      path: '/'
    };

    // Refresh token cookie (long-lived, restricted path)
    const refreshTokenOptions = {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      domain: cookieDomain,
      maxAge: (process.env.JWT_REFRESH_COOKIE_EXPIRE || 7) * 24 * 60 * 60 * 1000, // 7 days
      path: '/'
    };

    // Set cookies and respond
    res
      .status(200)
      .cookie("accessToken", newAccessToken, accessTokenOptions)
      .cookie("refreshToken", newRefreshToken, refreshTokenOptions)
      .json({
        success: true,
        message: "Tokens refreshed successfully",
        accessToken: newAccessToken // Optional: for clients that store in memory
      });

  } catch (error) {
    // Clear invalid tokens on error
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return next(new HandleError("Invalid or expired refresh token", 401));
  }
});

export const registerUser = handleAsyncError(async (req, res, next) => {
  console.log("user is trying to register ", req.body);
  const { name, email, password,phone:ph} = req.body;
  console.log("name is ", name, " email is ", email, " password is ", password);
  console.log("trying to create user");
  const phone=[];
  phone.push(ph);
  
  const user = await User.create({
    name,
    email,
    password,
    phone
   
  });
  console.log("user created is ",user);
  sendToken(user, 200, res);

});

export const Login = handleAsyncError(async (req, res, next) => {
  console.log("req body is ", req.body);
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new HandleError("Email or passoword cannot be empty", 400));
  }
  console.log("trying to get user ");
  const user = await User.findOne({ email }).select("+password");
  console.log("user is ", user);
  if (!user) {
    return next(new HandleError("Invalid email or password", 401));
  }
  const isValid = await user.verifyPassword(password);
  if (!isValid) {
    return next(new HandleError("Invalid Email or Password", 401));
  }
  sendToken(user, 200, res);
});

export const logout = handleAsyncError(async (req, res, next) => {
  console.log("trying to logout user");
  res.cookie("accessToken", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.cookie("refreshToken", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  })
  console.log("successfull");
  res.status(200).json({
    success: true,
    message: "Successfully Logged Out",
  });
});

export const addToCart = handleAsyncError(async (req, res, next) => {
  console.log("trying to add product to cart ", req.body);
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  if (!productId || !quantity) {
    return res.status(400).json({
      success: false,
      message: "Product ID and quantity are required",
    });
  }

  if (parseInt(quantity) <= 0) {
    return res.status(400).json({
      success: false,
      message: "Quantity must be greater than 0",
    });
  }
  console.log("trying to get user by userId ", userId);
  // const user = await User.findById(userId);

  const user = await getUser(userId);

  console.log("user is ", user);

  // const productExists = user.cart.find(
  //   (item) => item?.productId?.toString() === productId?.toString()
  // );
  const existingItem = await findCartItem(user.cart, productId);
  console.log("existing item is ", existingItem);
  console.log("you are here 1");
  // if (productExists) {
  //   console.log("you are here 2");
  //   user.cart.forEach((item) => {
  //     if (item.productId?.toString === productId?.toString()) {
  //       item.quantity = quantity;
  //     }
  //   });
  // } else {
  //   user.cart.push({
  //     productId,
  //     quantity,
  //   });
  // }
  if (existingItem) {
    console.log("you are at existing item");
    updateCartItemQuantity(user.cart, productId, quantity);
    console.log("user is ", user);
  } else {
    console.log("this is new item to cart ", user);
    user.cart.push({
      productId,
      quantity,
    });
    console.log("after pushing item to cart ", user);
  }
  console.log("user is ", user);
  console.log("trying to save to the database");
  await user.save({ validateBeforeSave: false });
  console.log("successfully done");
  res.status(200).json({
    success: true,
    productId,
    quantity,
    message: existingItem ? "Cart Item quantity updated" : "item added to cart",
  });
});

// export const getCartItems = handleAsyncError(async (req, res, next) => {
//   console.log("getting cart items controller ")
//   const userId = req.user._id;
//   const user = await User.findById(userId).populate('cart.productId', 'name price images');

//   if (!user) {
//     return next(new HandleError("User not found", 404));
//   }

//   console.log("you are here");
//   console.log("seeing the item 0 ",user.cart);
//   const cartItems = user.cart.map(item => ({
//     id: item.productId._id.toString(),
//     name: item.productId.name,
//     price: item.productId.price,
//     image: item.productId.image,
//     quantity: item.quantity
//   }));

//   console.log("cart items is ",cartItems);

//   res.status(200).json({
//     success: true,
//     cartItems
//   });
// });

// with aggregation
export const getCartItems = handleAsyncError(async (req, res, next) => {
  const userId = req.user._id;
  console.log("req.user is ", req.user);
  const result = await User.getCartWithProducts(userId);

  if (!result) {
    return next(new HandleError("User Not Found ", 404));
  }
  // console.log("result is ",result[0].cart);
  const user = result[0];
  const cart = user.cart;
  console.log("cart is ", cart);
  const cartItems = cart.map((item) => ({
    id: item.productId.toString(),
    name: item.product.name,
    price: item.product.price,
    image: item.product.image,
    quantity: item.quantity,
  }));
  res.status(200).json({
    success: true,
    cartItems,
  });
});


export const removeItemFromCart = handleAsyncError(async (req, res, next) => {
  console.log("you are in controller which remove items from cart");
  const userId = req.user._id;
  const user = await getUser(userId);
  const productId = req.params.productId;
  const cart = user.cart;
  const index = cart.findIndex((item) => item.productId?.toString() === productId?.toString());
  console.log("index of item which we need to remove is ", index);
  console.log("user before splice section is ", user);
  if (index !== -1) {
    console.log("in splice section");
    user.cart.splice(index, 1);
  }
  console.log("user after splice is ", user);
  await user.save({ validateBeforeSave: false });
  console.log("successfully done");
  res.status(200).json({
    success: true,
    productId,
    message: "Item removed from the cart",
  });



})




export const addPhone = handleAsyncError(async (req, res, next) => {
  const userId = req.user._id;
  const { phone } = req.body;

  // Validation
  if (!phone) {
    return next(new HandleError("Phone number is required", 400));
  }

  const user = await getUser(userId);
  if (!user) {
    return next(new HandleError("User not found", 404));
  }

  // Convert phone to string and add to array
  const phoneString = phone.toString();

  // Initialize phone array if it doesn't exist, otherwise push new number
  if (!user.phone || !Array.isArray(user.phone)) {
    user.phone = [];
    user.phone.push(phoneString)
  } else {
    // Check if phone number already exists to avoid duplicates
    if (!user.phone.includes(phoneString)) {
      user.phone.push(phoneString);
    } else {
      return res.status(400).json({
        success: false,
        message: "Phone number already exists",
        user
      });
    }
  }

  console.log("user is ", user);
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    user,
    success: true,
    message: "Phone number added successfully"
  });
});



// New Address Controller
export const addAddress = handleAsyncError(async (req, res, next) => {
  const userId = req.user._id;
  const { pin, other } = req.body;

  // Validation
  if (!pin || !other) {
    return next(new HandleError("Both PIN and address details are required", 400));
  }

  const user = await getUser(userId);
  if (!user) {
    return next(new HandleError("User not found", 404));
  }

  // Create new address object
  const newAddress = {
    pin: pin.toString(),
    other: other.toString()
  };

  // Initialize address array if it doesn't exist, otherwise push new address
  if (!user.address || !Array.isArray(user.address)) {
    user.address = [newAddress];
  } else {
    user.address.push(newAddress);
  }

  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "Address added successfully",
    user
  });
});




// export const sendOTP = handleAsyncError(async (req, res, next) => {
//   const accountSid = process.env.T_SID_ACCOUNT;
//   const authToken = process.env.T_AUTH_TOKEN;
//   const client=new twilio(accountSid,authToken)
//   console.log("you are at send otp controller")
//   client.verify.v2.services(process.env.T_VERIFY)
//       .verifications
//       .create({to: '+917461990368', channel: 'sms'})
//       .then(verification => console.log("verification sid is",verification.sid));
//   res.status(200).json({
//     success: true,
//     message: "otp sent successfully",
   
//   });

  

// });
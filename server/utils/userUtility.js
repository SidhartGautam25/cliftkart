import User from "../models/User.js";

export const getUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not Found");
  }
  return user;
};

export const findCartItem = async (cart, productId) => {
  return cart.find(
    (item) => item?.productId?.toString() === productId?.toString()
  );
};

export const updateCartItemQuantity = (cart, productId, quantity) => {
  cart.forEach((item) => {
    if (item.productId?.toString() === productId?.toString()) {
      item.quantity = quantity.toString(); // Ensure string format for consistency
    }
  });
};

import express from "express";
import { addAddress, addPhone, addToCart, getCartItems, Login, logout, refreshToken, registerUser, removeItemFromCart } from "../controllers/user.js";
// import { verifyUser } from "../middlewares/user.js";
import { verifyUser } from "../middlewares/user_2.js";
import { roleBasedAccess } from "../middlewares/user.js";
import { deleteUser, getSingleUser, getUsersList, updateUserRole } from "../controllers/admin.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(Login);
// router.route("/sendOTP").post(sendOTP);
router.route("/refresh-token").post(refreshToken);
router.route("/addToCart").post(verifyUser, addToCart);
router.route("/loadCart").get(verifyUser, getCartItems);
router.route("/removeFromCart/:productId").delete(verifyUser,removeItemFromCart);
router.route("/addAddress").post(verifyUser, addAddress);
router.route("/addPhone").post(verifyUser, addPhone);
router.route("/logout").post(logout);

// Admin
router.route("/admin/users").get(verifyUser,roleBasedAccess('admin'), getUsersList);
router.route("/admin/user/:id")
    .get(verifyUser,roleBasedAccess('admin'), getSingleUser)
    .put(verifyUser,roleBasedAccess('admin'),  updateUserRole)
    .delete(verifyUser, roleBasedAccess('admin'), deleteUser)



export default router;

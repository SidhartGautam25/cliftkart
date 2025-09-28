import express from "express";
import { verifyUser } from "../middlewares/user_2.js";
import {createOrder, getMyOrders, getOrdersByDate} from "../controllers/order.js";

const router = express.Router();


router.route("/new/order").post(verifyUser,createOrder );
router.route("/orders/user").get(verifyUser , getMyOrders);
router.route("/orders/date").get(verifyUser, getOrdersByDate);


export default router;

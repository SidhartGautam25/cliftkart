import express from "express";
import { roleBasedAccess} from "../middlewares/user.js";
import { createProduct, getProduct, getProducts, getProductsByTag } from "../controllers/product.js";
import { getAdminProducts, updateProductController } from "../controllers/admin.js";
import { verifyUser } from "../middlewares/user_2.js";


const router = express.Router();

router.route("/products").get(getProducts);
router.route("/productsByTag").get(getProductsByTag);
router.route("/product/:id").get(getProduct);
// role based access is missing for now
router.route("/admin/product/create").post(verifyUser,roleBasedAccess('admin'),createProduct);
router.route("/admin/products").get(verifyUser,roleBasedAccess('admin'),getAdminProducts);
router.route("/admin/product/:id").put(verifyUser,roleBasedAccess('admin'),updateProductController);



export default router;

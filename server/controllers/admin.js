import handleAsyncError from "../middlewares/handleAsyncError.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

export const getUsersList = handleAsyncError(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        success: true,
        users
    })
})

//Admin- Getting single user information
export const getSingleUser = handleAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new HandleError(`User doesn't exist with this id: ${req.params.id}`, 400))
    }
    res.status(200).json({
        success: true,
        user
    })


})

//Admin- Changing user role
export const updateUserRole = handleAsyncError(async (req, res, next) => {
    console.log("trying to change the user role")
    const { role } = req.body;
    const newUserData = {
        role
    }
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true
    })
    if (!user) {
        return next(new HandleError("User doesn't exist", 400))
    }
    console.log("changed the user role")
    res.status(200).json({
        success: true,
        user
    })


})


// Admin - Delete User Profile
export const deleteUser = handleAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new HandleError("User doesn't exist", 400))
    }
    //    const imageId=user.avatar.public_id;
    //    await cloudinar.uploader.destroy(imageId)
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
        success: true,
        message: "User Deleted Successfully"
    })
})


export const getAdminProducts = handleAsyncError(async (req, res, next) => {
    const products = await Product.find();
    res.status(200).json({
        success: true,
        products,
    });

})

export const updateProductController = handleAsyncError(async (req, res, next) => {
    console.log("you are in controller which update product details");
    console.log("req.body looks like ", req.body);
    const data = req.body;
    const id = req.params.id;
    console.log("id is ",id);
    if (!data || Object.keys(data).length === 0) {
        return next(new ErrorHandler("Product data is required for update.", 400));
    }
    console.log("going to load product from database");
    let product = await Product.findById(id);
    if (!product) {
        // If no product is found, send a 404 Not Found error
        console.log("no product found")
        return next(new ErrorHandler("Product not found.", 404));
    }
    console.log("id is ", id);
    data.image=product.image;
    product = await Product.findByIdAndUpdate(id, data, {
        new: true,             // This option returns the modified document rather than the original
        runValidators: true,   // This ensures that the update runs your schema validators
        useFindAndModify: false// Recommended to use the native findOneAndUpdate()
    });
    res.status(200).json({
        success: true,
        message: "Product Updated Successfully!",

    });

})

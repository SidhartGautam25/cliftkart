import handleAsyncError from "../middlewares/handleAsyncError.js";
import Order from "../models/Order.js";
import HandleError from '../utils/handleError.js'; // Assuming this is your error handler utility

// Extend Express's Request type to include the 'user' property from auth middleware

/**
 * @desc    Create a new order
 * @route   POST /api/v1/new/order
 * @access  Private
 */
export const createOrder = handleAsyncError(async (req,res,next) => {
  console.log("you are here to craete order");
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt
    } = req.body;

    if (!req.user) {
        return next(new HandleError("Authentication required to place an order.", 401));
    }

    console.log("going to insert order data in database");
    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt,
        user: req.user.id,
    });
    
    console.log("order created successfully");
  console.log("order returning is ",order);
    res.status(201).json({
        success: true,
        order,
    });
});


export const getMyOrders = handleAsyncError(async (req, res, next) => {
    if (!req.user) {
        return next(new HandleError("Authentication required to view orders.", 401));
    }
    console.log("you want to get orders for a specific user ");
    const orders = await Order.find({ user: req.user.id });
    console.log("order for that user is ");
  console.log(orders);
    res.status(200).json({
        success: true,
        orders,
    });
});

/**
 * @desc    Get a single order by its ID
 * @route   GET /api/v1/order/:id
 * @access  Private
 */
export const getSingleOrder = handleAsyncError(async (req, res, next) => {
    // Populate the 'user' field to also send back the user's name and email
    const order = await Order.findById(req.params.id).populate("user", "name email");
    
    if (!order) {
        return next(new HandleError("Order not found with this ID", 404));
    }

    res.status(200).json({
        success: true,
        order,
    });
});

export const getOrdersByDate = handleAsyncError(async (req, res, next) => {
    const { date } = req.query;
    const page = Number(req.query.page) || 1;
    const limit = 10; // You can adjust the number of orders per page

    if (!date) {
        return next(new HandleError("Please provide a date.", 400));
    }

    // Create a date range for the entire specified day in UTC.
    // This ensures that the query correctly captures all orders from that day,
    // regardless of the time zone they were created in.
    const startDate = new Date(date);
    startDate.setUTCHours(0, 0, 0, 0);

    const endDate = new Date(date);
    endDate.setUTCHours(23, 59, 59, 999);

    const query = {
        user: req.user._id, // Assumes authentication middleware adds user to req
        createdAt: {
            $gte: startDate,
            $lte: endDate,
        },
    };

    const orderCount = await Order.countDocuments(query);

    const orders = await Order.find(query)
        .sort({ createdAt: -1 }) // Show the most recent orders first
        .limit(limit)
        .skip(limit * (page - 1));

    res.status(200).json({
        success: true,
        orders,
        currentPage: page,
        totalPages: Math.ceil(orderCount / limit),
        count: orderCount
    });
});



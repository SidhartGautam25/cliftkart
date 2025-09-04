// import Razorpay from "razorpay";
// import fs from "fs";
// import handleAsyncError from "../middlewares/handleAsyncError.js";
// import crypto from "crypto";

// const readData = () => {
//     if (fs.existsSync('orders.json')) {
//         const data = fs.readFileSync('orders.json');
//         return JSON.parse(data);
//     }
//     return [];
// }

// const writeData = (data) => {
//     fs.writeFileSync('orders.json', JSON.stringify(data, null, 2));

// }


// export const createOrder1 = handleAsyncError(async (req, res, next) => {
//     const razorpay = new Razorpay({
//         key_id: 'rzp_test_zMXXKjlsacMvLY',
//         key_secret: 'OcnJAlZXES3rqv4vmn9ZkegZ',
//     });
//     try {
//         const { amount, currency, reciept, notes } = req.body;
//         const options = {
//             amount: amount * 100,
//             currency,
//             reciept,
//             notes,
//         }

//         const order = await razorpay.orders.create(options);
//         if (!fs.existsSync('orders.json')) {
//             writeData([]);
//         }
//         const orders = readData();
//         orders.push({
//             order_id: order.id,
//             amount: order.amount,
//             currency: order.currency,
//             reciept: order.receipt,
//             status: 'created'
//         });
//         writeData(orders);
//         res.json(order);
//     } catch (err) {
//         console.error("error occcured my friend ", err);
//         res.status(500).send('Error while creating order')
//     }



// });


// export const paymentSuccess = handleAsyncError(async (req, res, next) => {
//     res.status(200).json({ success: true })
// })


// export const createOrder = handleAsyncError(async (req, res, next) => {
//     console.log("tryoing to initiate a rozorpay instance")
//     const razorpay = new Razorpay({
//         key_id: 'rzp_test_zMXXKjlsacMvLY',
//         key_secret: 'OcnJAlZXES3rqv4vmn9ZkegZ',
//     });
//     try {
//         const { amount } = req.body;
//         if (!amount) {
//             return res.status(400).json({
//                 success: false,
//                 message: "no amount provided"
//             })
//         }
//         const options = {
//             amount: amount * 100,
//             currency: 'INR',
//             receipt: `receipt_${Date.now()}`,
//         }
//         console.log("trying to craete a order");
//         const order = await razorpay.orders.create(options);
//         console.log("order created successfully");
//         return res.status(200).json({
//             success: true,
//             orderId: order.id,
//         });


//     } catch (err) {
//         console.error("Create Order Error:", error);
//         return res.status(500).json({
//             success: false,
//             message: "Failed to create order",
//         });

//     }
// })


// export const verifyOrder = handleAsyncError(async (req, res, next) => {
//     try {
//         console.log("now you are trying to verifying order 1 ")
//         const { orderId, razorpayPaymentId, razorpaySignature } = req.body;
//         console.log("orderId is ",orderId," razorpayPaymentId is ",razorpayPaymentId," razorpay signature is ",razorpaySignature);
//         if (!orderId || !razorpayPaymentId || !razorpaySignature) {
//             return res
//                 .status(400)
//                 .json({ success: false, message: "Invalid request parameters" });
//         }
//         const generatedSignature = crypto
//             .createHmac("sha256", 'OcnJAlZXES3rqv4vmn9ZkegZ')
//             .update(`${orderId}|${razorpayPaymentId}`)
//             .digest("hex");
//         if (generatedSignature === razorpaySignature) {
//             console.log("everything is done correctly")
//             return res.status(200).json({
//                 success: true,
//                 message: "Payment verified successfully",
//             });
//         } else {
//             return res.status(400).json({
//                 success: false,
//                 message: "Payment verification failed",
//             });
//         }

//     }

//     catch (error) {
//         console.error("Payment Verification Error:", error);
//         return res.status(500).json({
//             success: false,
//             message: "Failed to verify payment"
//         });

//     }
// })

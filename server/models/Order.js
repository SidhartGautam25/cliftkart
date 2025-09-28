import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    shippingInfo: {
        address: { type: String },
        city: { type: String },
        state: { type: String },
        country: { type: String },
        pinCode: { type: Number },
        phoneNo: { type: Number },
    },
    orderItems: [
        {
            name: { type: String },
            price: { type: Number },
            quantity: { type: Number },
            image: { type: String },
            properties: {
            type: Map,
            of: String
        },
            product: { type: mongoose.Schema.ObjectId, ref: "Product" },
        },
    ],
    user: { type: mongoose.Schema.ObjectId, ref: "User" },
    paymentInfo: {
        id: { type: String },
        status: { type: String },
    },
    paidAt: { type: Date },
    itemPrice: { type: Number, default: 0 },
    taxPrice: { type: Number, default: 0 },
    shippingPrice: { type: Number, default: 0 },
    totalPrice: { type: Number, default: 0 },
    orderStatus: { type: String, default: "Processing" },
    deliveredAt: Date,
    createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
;

import React from "react";
// import { useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import { useAppSelector } from "../../context/hooks";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

const Payment: React.FC = () => {
//   const orderItem = JSON.parse(sessionStorage.getItem("orderItem"));
//   const { user } = useAppSelector((state) => state.user);
//   const { shippingInfo } = useAppSelector((state) => state.cart);
//   const navigate = useNavigate();

//   const completePayment = async (amount: number) => {
//     try {
//       const { data: keyData } = await axios.get("/api/v1/getKey");
//       const { key } = keyData;

//       const { data: orderData } = await axios.post("/api/v1/payment/process", {
//         amount,
//       });
//       const { order } = orderData;

//       const options = {
//         key,
//         amount,
//         currency: "INR",
//         name: "ShopEasy",
//         description: "Ecommerce Website Payment Transaction",
//         order_id: order.id,
//         handler: async function (response) {
//           const { data } = await axios.post("/api/v1/paymentVerification", {
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_order_id: response.razorpay_order_id,
//             razorpay_signature: response.razorpay_signature,
//           });
//           if (data.success) {
//             navigate(`/paymentSuccess?reference=${data.reference}`);
//           } else {
//             alert("Payment verification Failed");
//           }
//         },
//         prefill: {
//           name: user?.name,
//           email: user?.email,
//           contact: shippingInfo.phoneNumber,
//         },
//         theme: {
//           color: "#3399cc",
//         },
//       };

//       const rzp = new Razorpay(options);
//       rzp.open();
//     } catch (error) {
//       toast.error("some error occured while processing the payment", {
//         position: "top-center",
//         autoClose: 3000,
//       });
//     }
//   };

  return <div>Payment</div>;
};

export default Payment;

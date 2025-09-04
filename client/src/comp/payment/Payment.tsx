import axios from "axios";
// import React, { useEffect, useState } from "react";

// import Login_img from "../../../public/cliftkart_login.png";
declare global {
  interface Window {
    Razorpay: any;
  }
}

const PaymentC: React.FC = () => {
  // const [amount, setAmount] = useState(500);
  const amount=500;

  const handlePayment = async () => {
    if (!amount) {
      alert("Please enter an amount");
      return;
    }

    try {
      // Step 1: Create order on the backend
      const { data } = await axios.post("http://localhost:8000/api/v1/createOrder", {
        amount: Number(amount) * 100, // Convert ₹ to paise
        currency: "INR",
      });

      if (!data.success) {
        alert("Error creating order");
        return;
      }
      console.log("your are now going to create option in client side");

      const options = {
        key: "rzp_test_zMXXKjlsacMvLY", // Replace with your Razorpay Key ID
        amount: Number(amount) ,
        currency: "INR",
        name: "Digittrix",
        description: "Payment for Product/Service",
        order_id: data.orderId,
        handler: async function (response:any) {
          console.log("now we will send our server a request to verify the payment");
          const verifyRes = await axios.post(
            "http://localhost:8000/api/v1/verifyOrder",
            {
              orderId: data.orderId,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            }
          );

          if (verifyRes.data.success) {
            alert("Payment successful!");
            
          } else {
            alert("Payment verification failed!");
          }
        },
        prefill: {
          name: "John Doe",
          email: "johndoe@example.com",
          contact: "9876543210",
        },
        theme: {
          color: "#528FF0",
        },
      };

      console.log("now going to create razorpay instance on client side");
      console.log("options created uis ",options);
      const razorpay = new window.Razorpay(options);
      console.log("now trying to open the window");
      razorpay.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment failed, try again.");
    }
  };

  return <div>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
        <h2>Sample Product</h2>
        <p>Pay to test Razorpay integration.</p>
        <button
          onClick={handlePayment} // Pass the amount (e.g., 500)
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#3399cc',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Pay Now
        </button>
      </div>
    </div>
  </div>;
};

export default PaymentC;

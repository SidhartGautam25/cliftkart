import React from "react";
import Navbar from "../comp/navbar/Navbar";
import Footer from "../comp/footer/Footer";
import LoginC from "../comp/login/Login";

const Login: React.FC = () => {
  return (
    <div>
      <Navbar />
      <LoginC />
      <Footer />
    </div>
  );
};

export default Login;

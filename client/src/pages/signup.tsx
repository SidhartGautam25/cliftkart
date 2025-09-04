import React from "react";
import Navbar from "../comp/navbar/Navbar";
import Footer from "../comp/footer/Footer";
import SignupC from "../comp/signup/Signup";

const Signup: React.FC = () => {
  return (
    <div>
      <Navbar />
      <SignupC />
      <Footer />
    </div>
  );
};

export default Signup;

import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useAppDispatch, useAppSelector } from "../../context/hooks";
import {
  register,
  removeErrors,
  removeSuccess,
} from "../../context/user/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import signup_img from '../../../public/cliftkart_signup.jpg';

const SignupC: React.FC = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone:""
  });
  const { name, email, password ,phone} = user;
  const { success, error } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const onChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("trying to signup")
    if (!name || !email || !password || !phone) {
      toast.error("Please fill all the field properly");
      return;
    }
    // const myForm = new FormData();
    // myForm.set("name", name);
    // myForm.set("email", email);
    // myForm.set("password", password);
    // console.log("trying to dispatch register ",myForm);
    dispatch(register({name, email,phone, password}));
    
  };
  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (success) {
      console.log("registration successfull");
      toast.success("Registration SuccessFul", {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeSuccess());
      navigate("/login");
    }
  }, [dispatch, success]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-stretch">
        {/* Left Image Side (hidden on small screens) */}
        <div className="hidden md:block w-1/2 bg-blue-50">
          <img
            src={signup_img} // Replace with your actual path
            alt="Signup visual"
            className="object-cover h-full w-full"
          />
        </div>

        {/* Right Form Side */}
        <div className="w-full md:w-1/2 p-8 md:p-16">
          <h2 className="text-2xl font-semibold mb-2">Create an account</h2>
          <p className="text-sm text-gray-600 mb-6">Enter your details below</p>

          <form className="space-y-4" onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={onChanges}
              className="w-full border-b border-gray-300 py-2 outline-none focus:border-black"
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={onChanges}
              className="w-full border-b border-gray-300 py-2 outline-none focus:border-black"
            />
             <input
              type="phone"
              placeholder="Phone Number"
              name="phone"
              value={phone}
              onChange={onChanges}
              className="w-full border-b border-gray-300 py-2 outline-none focus:border-black"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={onChanges}
              className="w-full border-b border-gray-300 py-2 outline-none focus:border-black"
            />
            <button
              type="submit"
              className="w-full bg-[#821a4e] text-white py-2 rounded hover:bg-[#4a1630] transition"
            >
              Create Account
            </button>
          </form>

          {/* Google Sign Up */}
          <button className="w-full mt-4 border border-gray-300 py-2 rounded flex items-center justify-center gap-2 hover:bg-gray-50 transition">
            <FcGoogle size={20} />
            <span className="text-sm">Sign up with Google</span>
          </button>

          {/* Already have account */}
          <p className="text-sm text-center mt-4 text-gray-600">
            Already have account?{" "}
            <a href="/login" className="text-black underline">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupC;

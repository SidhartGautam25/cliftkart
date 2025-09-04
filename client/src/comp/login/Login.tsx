import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import {
  login,
  removeErrors,
  removeSuccess,
} from "../../context/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../context/hooks";
import { useNavigate } from "react-router-dom";
// import Login_img from "../../../public/cliftkart_login.png";
import Login_img from "../../../public/Cliftkart_login.png";

const LoginC: React.FC = () => {
  const [lEmail, setLEmail] = useState<string>("");
  const [lPassword, setLPassword] = useState<string>("");
  const navigate = useNavigate();
  const { error, success, isAuthenticated } = useAppSelector(
    (state) => state.user
  );
  const homeUrl = "/";
  const dispatch = useAppDispatch();
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("trying to dispatch login");
    dispatch(login({ email: lEmail, password: lPassword }));
  };
  useEffect(() => {
    if (error) {
      toast.error("Something went wrong , please check your details again", { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(homeUrl);
    }
  }, [isAuthenticated]);
  useEffect(() => {
    if (success) {
      toast.success("login successfull", {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeSuccess());
    }
  }, [dispatch, success]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-stretch">
        {/* Left Image Side (hidden on small screens) */}
        <div className="hidden md:block w-1/2 bg-blue-50">
          <img
            src={Login_img} // Replace with your actual path
            alt="Signup visual"
            className="object-cover h-full w-full"
          />
        </div>

        {/* Right Form Side */}
        <div className="w-full md:w-1/2 p-8 md:p-16">
          <h2 className="text-2xl font-semibold mb-2">Enter Your Details</h2>
          {/* <p className="text-sm text-gray-600 mb-6">Enter your details below</p> */}

          <form className="space-y-4" onSubmit={onSubmit}>
            <input
              type="email"
              placeholder="Email"
              className="w-full border-b border-gray-300 py-2 outline-none focus:border-black"
              onChange={(e) => setLEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border-b border-gray-300 py-2 outline-none focus:border-black"
              onChange={(e) => setLPassword(e.target.value)}
            />
            <button
              type="submit"
              className="w-full bg-[#821a4e] text-white py-2 rounded hover:bg-[#4a1630] transition"
            >
              Log In
            </button>
          </form>

          {/* Google Sign Up */}
          <button className="w-full mt-4 border border-gray-300 py-2 rounded flex items-center justify-center gap-2 hover:bg-gray-50 transition">
            <FcGoogle size={20} />
            <span className="text-sm">Sign in with Google</span>
          </button>

          {/* Already have account */}
          <p className="text-sm text-center mt-4 text-gray-600">
            <span>Create your account instead? </span>
            <a
              href="/signup"
              className="font-medium text-black underline hover:text-gray-800"
            >
              Sign up
            </a>
            <span className="mx-2 text-gray-400">|</span>
            <a
              href="/reset-password"
              className="font-medium text-black underline hover:text-gray-800"
            >
              Forget password?
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginC;

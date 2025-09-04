import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Mail, LockKeyhole } from 'lucide-react';
import { Link } from 'react-router-dom';

const ForgotPasswordPage: React.FC = () => {
  // State to manage which step we are on
  // const [step, setStep] = useState(1); // 1 for email input, 2 for OTP/password input
  const step=1;
  // Form fields
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);

  // Step 1: User submits their email to get an OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post('http://localhost:8000/api/v1/sendOTP', { email });
      console.log("Data is ",data);
    //   toast.success(data.message);
    //   setStep(2); // Move to the next step
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: User submits the OTP and new password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post('/api/v1/user/reset-password', {
        email,
        otp,
        password,
      });
      toast.success(data.message);
      // Optional: Redirect to login after a delay
      setTimeout(() => {
        window.location.href = '/login';
      }, 3000);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <ToastContainer position="top-center" autoClose={5000} />
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        {step === 1 ? (
          // STEP 1: Email Form
          <div>
            <div className="text-center">
              <Mail className="mx-auto h-12 w-12 text-gray-400" />
              <h2 className="mt-6 text-3xl font-bold text-gray-900">Forgot Password?</h2>
              <p className="mt-2 text-sm text-gray-600">Enter your email to receive a One-Time Password (OTP).</p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSendOtp}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                <input id="email" name="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="you@example.com" />
              </div>
              <button type="submit" disabled={loading} className="w-full flex justify-center py-2 px-4 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50">
                {loading ? 'Sending...' : 'Send OTP'}
              </button>
            </form>
          </div>
        ) : (
          // STEP 2: OTP and New Password Form
          <div>
            <div className="text-center">
              <LockKeyhole className="mx-auto h-12 w-12 text-gray-400" />
              <h2 className="mt-6 text-3xl font-bold text-gray-900">Reset Your Password</h2>
              <p className="mt-2 text-sm text-gray-600">An OTP has been sent to <strong>{email}</strong>. Please enter it below.</p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleResetPassword}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="otp" className="block text-sm font-medium text-gray-700">One-Time Password (OTP)</label>
                  <input id="otp" name="otp" type="text" required value={otp} onChange={(e) => setOtp(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter the 6-digit OTP" />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">New Password</label>
                  <input id="password" name="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter new password" />
                </div>
                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                  <input id="confirm-password" name="confirm-password" type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Confirm new password" />
                </div>
              </div>
              <button type="submit" disabled={loading} className="w-full flex justify-center py-2 px-4 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50">
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>
          </div>
        )}
        <p className="text-center text-sm text-gray-500 mt-6">
            Remember your password? <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
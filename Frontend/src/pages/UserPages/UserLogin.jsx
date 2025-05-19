import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const UserLogin = () => {
  const navigate = useNavigate();

  // Redirect to caption login page
  const handleRedirectCaptionLogin = () => {
    navigate("/caption/login");
  };


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = (e) => {
    e.preventDefault();

  setEmail("");
  setPassword("");
  
  };

  return (
    <div>
      <img
        className="w-20 h-20 mt-4 ml-5"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ14V4nwJuBiYM0kv2QOGnm4nK2PY267HJt_WWU3fcw_gH_SDQ_hVg5dHOH9fj3IFgz_8w&usqp=CAU"
        alt="logo"
      />
      <div className="min-h-screen flex  flex-col  items-center">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition duration-200"
            >
              Login
            </button>
          </form>
          <div className="text-center mt-4">
            <span className="text-gray-600">Don't have an account? </span>
            <Link to="/user/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </div>
        </div>
        <button
          onClick={handleRedirectCaptionLogin}
          type="submit"
          className=" mt-24 bg-green-400 w-[80%] font-2xl text-white py-3 rounded hover:bg-green-800 transition duration-200"
        >
          Signup as a caption
        </button>
      </div>
    </div>
  );
};

export default UserLogin;

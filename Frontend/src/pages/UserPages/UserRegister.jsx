import React, { useState } from "react";
import { Link } from "react-router-dom";

const UserRegister = () => {
  const [fullname, setFullName] = useState({
    firstName: "",
    lastName: "",
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    // Implement registration logic here
    console.log({ fullname, email, password });
    // Reset fields if needed
    setFullName({ firstName: "", lastName: "" });
    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen flex flex-col p-4">
      <img
        className="w-20 h-20 mt-4"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ14V4nwJuBiYM0kv2QOGnm4nK2PY267HJt_WWU3fcw_gH_SDQ_hVg5dHOH9fj3IFgz_8w&usqp=CAU"
        alt="logo"
      />
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <form onSubmit={handleRegister}>
          {/* Name Fields in a Single Row */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              What's your name?
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="First Name"
                required
                value={fullname.firstName}
                onChange={(e) => setFullName({ firstName: e.target.value })}
                className="w-1/2 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
              />
              <input
                type="text"
                placeholder="Last Name"
                required
                value={fullname.lastName}
                onChange={(e) =>
                  setFullName({ ...fullname, lastName: e.target.value })
                }
                className="w-1/2 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
              />
            </div>
          </div>
          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="example@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
            />
          </div>
          {/* Password Field */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition duration-200"
          >
            Register
          </button>
        </form>
        <div className="text-center mt-4">
          <span className="text-gray-600">Already have an account? </span>
          <Link to="/user/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </div>
      </div>
      <p className="text-center mt-4 text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
        perspiciatis, cupiditate distinctio deleniti aspernatur inventore,
      </p>
    </div>
  );
};

export default UserRegister;

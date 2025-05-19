import React, { useState } from "react";
import { Link } from "react-router-dom";

const CaptionRegister = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [plate, setPlate] = useState("");
  const [capacity, setCapacity] = useState("");
  const [color, setColor] = useState("");
  const [vehicalType, setVehicalType] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    const registrationData = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email,
      password,
      vehical: {
        plate,
        capacity: Number(capacity),
        color,
        vehicalType,
      },
    };

    console.log("Registration Data:", registrationData);
    // Add registration logic here (e.g., API call)

    // Clear form fields after registration
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setPlate("");
    setCapacity("");
    setColor("");
    setVehicalType("");
  };

  return (
    <div className="min-h-screen flex flex-col p-4">
      <img
        className="w-20 h-20 mt-4 ml-5"
        src="https://w7.pngwing.com/pngs/636/735/png-transparent-logo-uber-brand-design-text-logo-engineering-thumbnail.png"
        alt="logo"
      />
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Register as Caption
        </h2>
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
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-1/2 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
              />
              <input
                type="text"
                placeholder="Last Name"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
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
          {/* Vehical Details */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Vehical Details</label>
            <input
              type="text"
              placeholder="Plate (e.g. UP27 af 2332)"
              required
              value={plate}
              onChange={(e) => setPlate(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200 mb-2"
            />
            <input
              type="number"
              placeholder="Capacity (e.g. 10)"
              required
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200 mb-2"
            />
            <input
              type="text"
              placeholder="Color (e.g. red)"
              required
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200 mb-2"
            />
            <select
              required
              value={vehicalType}
              onChange={(e) => setVehicalType(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
            >
              <option value="" disabled>
                Select Vehical Type
              </option>
              <option value="motorcycle">Motorcycle</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
            </select>
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
          <Link to="/caption/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </div>
      </div>
      <p className="text-center mt-4 text-sm">
        Experience the future of mobility with our innovative transport solutions.
      </p>
    </div>
  );
};

export default CaptionRegister;
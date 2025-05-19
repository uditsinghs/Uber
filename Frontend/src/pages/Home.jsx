import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const navigateToLogin = () => {
    navigate("/user/login");
  };
  return (
    <div>
      <div className="h-screen bg-[url('https://images.unsplash.com/photo-1565052787975-722a108f423c?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-no-repeat bg-cover bg-center pt-5 flex justify-between flex-col w-full">
        <h1 className="text-white font-bold text-2xl   px-4 py-4">Uber</h1>
        <div className="bg-white py-5 px-7 ">
          <h2 className="text-3xl font-bold ml-4">Get Started with Uber</h2>
          <button
            onClick={navigateToLogin}
            className="w-full bg-black text-white py-3 px-5 rounded mt-2"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

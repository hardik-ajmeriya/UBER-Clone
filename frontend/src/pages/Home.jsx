import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/UBER.png"
const Home = () => {
  return (
    <div>
      <div className="bg cover bg-center bg-[url(https://images.unsplash.com/photo-1593950315186-76a92975b60c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen w-full flex justify-between flex-col pt-8">
        <img
          className="w-16 ml-8"
          src={logo}
          alt="Uber Logo"
        />
        <div className="bg-white py-3 px-4 pb-7">
          <h2 className="text-3xl font-bold">Get Started with Uber</h2>
          <Link
            to="/login"
            className="flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

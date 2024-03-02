"use client";

import React, { useState } from "react";
import Login from "@/components/homepages/Login";
import Register from "@/components/homepages/Register";
import bgImage from "@/assets/transittrack.jpg";

const Homepages = () => {
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const [showRegistMessage, setShowRegistMessage] = useState(false);

  const handleClickLogin = () => {
    setShowLoginMessage(true);
    setShowRegistMessage(false);
  };

  const handleClickRegister = () => {
    setShowRegistMessage(true);
    setShowLoginMessage(false);
  };

  return (
    <div
      className="h-screen"
      style={{
        backgroundImage: `url(${bgImage.src})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div className="w-[305px] h-[150px] bg-sky-500 rounded-[20px] flex justify-center items-center">
          <div className="text-white text-[32px] font-normal font-['Inter']">
            TransitTrack
          </div>
        </div>

        {!showLoginMessage && !showRegistMessage && (
          <div className="absolute top-[400px] left-0 right-0 flex justify-center items-center">
            <div className="w-[187px] h-[84px] bg-sky-500 rounded-[20px] flex justify-center items-center">
              <button
                className="text-white text-[32px] font-normal font-['Inter']"
                onClick={handleClickLogin}
              >
                Login
              </button>
            </div>
          </div>
        )}

        {showLoginMessage && (
          <div
            className="absolute w-[305px] h-[150px] bg-sky-500 rounded-[20px] flex justify-center items-center"
            style={{ width: "305px", top: "200px" }}
          >
            <Login />
          </div>
        )}

        {!showLoginMessage && !showRegistMessage && (
          <div className="absolute top-[500px] left-0 right-0 flex justify-center items-center">
            <div className="w-[187px] h-[84px] bg-sky-500 rounded-[20px] flex justify-center items-center">
              <button
                className="text-white text-[32px] font-normal font-['Inter']"
                onClick={handleClickRegister}
              >
                Register
              </button>
            </div>
          </div>
        )}

        {showRegistMessage && (
          <div
            className="absolute w-[305px] h-[150px] bg-sky-500 rounded-[20px] flex justify-center items-center"
            style={{ width: "305px", top: "200px" }}
          >
            <Register />
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepages;

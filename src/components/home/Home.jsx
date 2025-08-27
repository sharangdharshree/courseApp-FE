import React from "react";
import { textHome } from "../../assets/index.js";

function Home() {
  return (
    <div className="h-screen flex justify-center items-center bg-slate-950">
      <div
        className="absolute items-center-safe  h-[200px] w-[800px] bg-cover bg-center blur-[150px]"
        style={{ backgroundImage: `url(${textHome})` }}
      ></div>
      <div
        className="absolute text-transparent bg-center bg-clip-text font-bold text-[200px]  [text-shadow:0_0_20px_#FFFFFF0D,0_0_40px_#FFFFFF0D,0_0_60px_#FFFFFF0D,0_0_80px_#FFFFFF0D,0_0_100px_#FFFFFF0D]"
        style={{ backgroundImage: `url(${textHome})` }}
      >
        Home!
      </div>
    </div>
  );
}

export default Home;

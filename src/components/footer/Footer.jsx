import React from "react";
import {
  logo,
  github,
  instagram,
  linkedin,
  twitter,
} from "../../assets/index.js";

function Footer() {
  return (
    <footer className="flex justify-center items-end text-gray-50 bg-gradient-to-r from-slate-900 via-cyan-500 to-slate-900 min-h-125 rounded-md ">
      <div className="bg-slate-950 w-full min-h-124.5 rounded-md px-4 py-8 flex flex-col justify-around">
        <div className="grid grid-cols-4 gap-8">
          <div className="col-span-2 text-gray-50">
            <img src={logo} alt="logo" className="h-10 p-1" />
            <p className="font-medium mb-4">Home for programmers</p>
            <div className="flex h-10 w-10 mb-8">
              <img src={instagram} className="p-2" alt="instagram icon" />
              <img src={linkedin} className="p-2" alt="linkedin icon" />
              <img src={github} className="p-2" alt="github icon" />
              <img src={twitter} className="p-2" alt="twitter icon" />
            </div>
            <p>&#169; {2025} CourseWallah. All rights reserved.</p>
          </div>
          <div>
            <h3 className="text-gray-50 text-lg font-medium mb-4">Products</h3>
            <ul className="text-gray-300 space-y-3">
              <div>Courses</div>
              <div>Cohort</div>
              <div>Coding Hero</div>
              <div>Free API</div>
              <div>Become Masterji</div>
            </ul>
          </div>
          <div>
            <h3 className="text-gray-50 text-lg font-medium mb-4">Resources</h3>
            <ul className="text-gray-300 space-y-3">
              <div>Docs</div>
              <div>Privacy Policy</div>
              <div>Terms of Service</div>
              <div>Pricing Policy</div>
              <div>Refund Policy</div>
            </ul>
          </div>
        </div>
        <hr className="border-cyan-500/25 min-w-11/12 self-center" />
        <h2 className="w-full bg-gradient-to-r from-blue-500/75 via-cyan-500 to-blue-500/75 text-center text-gray-50 bg-clip-text md:text-9xl text-transparent font-medium text-wrap shadow-2xl sm:text-7xl text-4xl">
          {"<"}CourseWallah{"/>"}
        </h2>
      </div>
    </footer>
  );
}

export default Footer;

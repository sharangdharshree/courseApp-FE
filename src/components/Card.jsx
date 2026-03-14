import React from "react";
import { Link } from "react-router-dom";

function Card({
  id,
  banner,
  title,
  tags /* array of tags */,
  sellingPrice,
  mrp,
  discount,
}) {
  return (
    <div className="min-w-100 w-110 m-4 p-4 flex flex-col justify-between items-center flex-wrap text-gray-50 ">
      <div className="mb-4">
        <div className="h-59 w-full">
          <img
            src={banner}
            alt="thumbnail"
            className="w-full h-full shadow-2xl rounded-t-md"
          />
        </div>
        <div className="bg-slate-800 h-70 rounded-b-md p-4 flex flex-col justify-between">
          <div className="mb-8">
            <h2 className="text-2xl mb-2">{title}</h2>
            <div className="flex justify-start space-x-2">
              <p className="py-1 px-2 bg-red-500 rounded-sm text-sm">
                LIVE BATCH
              </p>
              <p className="py-1 px-2 bg-slate-700 rounded-sm text-sm">
                HINGLISH
              </p>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="block w-full  text-blue-500">
              Early Bird Discount
            </span>
            <div className="flex justify-between">
              <p className="space-x-3 text-xl">
                <span>&#8377; {sellingPrice}</span>
                <span>(+GST)</span>
                <span>
                  <del className="text-gray-400/50">&#8377; {mrp}</del>
                </span>
              </p>

              <p className="bg-gray-50 text-slate-900 rounded-sm px-2 py-1 text-sm">
                {discount}% OFF
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 w-full flex justify-center">
        <Link to={`/course/${id}`} className="w-full">
          <button className="bg-blue-500 hover:bg-blue-600 hover:cursor-pointer w-full p-2 rounded-md font-medium text-lg">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Card;

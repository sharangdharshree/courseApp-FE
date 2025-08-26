import React from "react";
import { useParams } from "react-router-dom";

function Course() {
  const { id } = useParams();
  return (
    <div className="h-screen text-gray-50 relative">
      <div className="bg-gray-500/50 h-100 w-full py-10 absolute"></div>
      <div className="p-10 flex">
        <div className="w-2/3 flex flex-col items-center h-screen px-10">
          {" Left"}
          <div className="">Course Details for _id: {id}</div>
          Cover Image/Dark Bg -- Top
          <h1>title</h1>
          <h3>overview</h3>
          <p>author: xyz</p>
          <p>
            <span>Last updated</span>
            <span>Language</span>
          </p>
          <div>Description</div>
          <div>Course Contents</div>
        </div>
        <div className="bg-slate-900 w-1/3 flex flex-col items-center h-150 absolute right-10">
          {" Right"}

          <div className="p-1">Course Purchase Card</div>
        </div>
      </div>
    </div>
  );
}

export default Course;

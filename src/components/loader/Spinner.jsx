import React from "react";

function Spinner() {
  return (
    <div className={` bg-cyan-500 h-12 w-12 rounded-full flex animate-spin`}>
      <div className="rounded-full w-11.5 h-11.5 bg-slate-950"></div>
    </div>
  );
}

export default Spinner;

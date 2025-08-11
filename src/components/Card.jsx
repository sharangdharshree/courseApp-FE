import React from "react";

function Card() {
  return (
    <div className="m-4 p-4 flex justify-center items-center">
      <div>
        <img src="" alt="thumbnail" />
        <div>
          <h2>Title</h2>
          <div>
            <p>Tag1</p> <p>Tag1</p>
          </div>
          <div>
            <span>Early Bird Discount</span>
            <p>Rs. 5999 (+GST) --Rs. 11999--</p>
            <p>50% OFF</p>
          </div>
        </div>
      </div>
      <button>View Details</button>
    </div>
  );
}

export default Card;

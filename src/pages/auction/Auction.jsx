import React from "react";
import "./Auction.css";
import { IoIosArrowBack } from "react-icons/io";

function Auction() {
  return (
    <>
      <div className="pageName">
        <IoIosArrowBack />
        <h2>Auction</h2>
      </div>
      <h4 className="auction_point">1 215 XP</h4>

      <div className="auction_data">

        <div className="div">
          <h3>sana vaqt</h3>
          <div className="date">
            <span>june 10,2024</span> <span>9:41 AM</span>
          </div>
        </div>
        <div className="div">
          <h3>keyingi auctiongacha qolgan vaqt </h3>
          <div className="time">52:44:32</div>
        </div>
      </div>
      <div className="auction_product">
        <h1>mahsulotlar</h1>

        <div className="cards">
          <div className="card">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/e/ee/Front_%26_Back_Face_of_iPhone_16_Pro_Max.png"
              alt=""
            />
            <h4>iphone</h4>
            <h5>
              start: <span>255 XP</span>
            </h5>
            <h6>
              <span>2</span> dona mavjud
            </h6>
          </div>
          <div className="card">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/e/ee/Front_%26_Back_Face_of_iPhone_16_Pro_Max.png"
              alt=""
            />
            <h4>iphone</h4>
            <h5>
              start: <span>255 XP</span>
            </h5>
            <h6>
              <span>2</span> dona mavjud
            </h6>
          </div>
          <div className="card">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/e/ee/Front_%26_Back_Face_of_iPhone_16_Pro_Max.png"
              alt=""
            />
            <h4>iphone</h4>
            <h5>
              start: <span>255 XP</span>
            </h5>
            <h6>
              <span>2</span> dona mavjud
            </h6>
          </div>
          <div className="card">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/e/ee/Front_%26_Back_Face_of_iPhone_16_Pro_Max.png"
              alt=""
            />
            <h4>iphone</h4>
            <h5>
              start: <span>255 XP</span>
            </h5>
            <h6>
              <span>2</span> dona mavjud
            </h6>
          </div>
          <div className="card">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/e/ee/Front_%26_Back_Face_of_iPhone_16_Pro_Max.png"
              alt=""
            />
            <h4>iphone</h4>
            <h5>
              start: <span>255 XP</span>
            </h5>
            <h6>
              <span>2</span> dona mavjud
            </h6>
          </div>
        </div>
      </div>
    </>
  );
}

export default Auction;

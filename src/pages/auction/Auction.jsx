import React, { useEffect, useState } from "react";
import "./Auction.css";
import { IoIosArrowBack } from "react-icons/io";
import { baseUrl } from "../../config";
import { getToken } from "../../service/token";
import FlipCountdown from "../../components/clock/FlipCountdown";

function Auction({ setLoader }) {
  const [studenPoint, setStudentPoint] = useState();
  const [auctionData, setAuctionData] = useState();
  console.log(auctionData);


  useEffect(() => {
    getStudentInfo();
    getAuctionData();
  }, []);

  const getStudentInfo = () => {
    setLoader(true);
    fetch(`${baseUrl}/students/get-me/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        setStudentPoint(result.point);
      })
      .catch((error) => {
        console.error("Error fetching student info:", error);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const getAuctionData = () => {
    setLoader(true);
    fetch(`${baseUrl}/current-auction/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setAuctionData(result);
      })
      .catch((error) => {
        console.error("Error fetching auction data:", error);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const dateTimeString = auctionData?.date && auctionData?.time
    ? `${auctionData.date}T${auctionData.time}`
    : null;

  const dateTime = dateTimeString ? new Date(dateTimeString) : null;
  const formattedDate = dateTime
    ? dateTime.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    : "";
  const formattedTime = dateTime
    ? dateTime.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    : "";

  return (
    <>
      <div className="pageName">
        <IoIosArrowBack />
        <h2>Auction</h2>
      </div>
      {studenPoint ? (
        <h4 className="auction_point">
          <span>Ball :</span> {studenPoint} XP
        </h4>
      ) : (
        ""
      )}
      <div className="auction_data">
        <div className="div">
          <h3>Keyingi auctiongacha qolgan vaqt</h3>
          <FlipCountdown targetTime={dateTime} />
        </div>
        <div className="div">
          <h3>Sana va vaqt va manzil</h3>
          <div className="date">
            <span>{formattedDate}</span> <span>{formattedTime}</span>
          </div>
          <h3>{auctionData?.description}</h3>

        </div>
      </div>
      <div className="auction_product">
        <h1>Mahsulotlar</h1>
        <div className="cards">
          {auctionData?.products?.map((item) => {
            console.log(item);

            return <>
              <div className="card">
                <div className="images">
                  <img src={item?.image} alt=""
                  />
                </div>
                <h4>{item?.name}</h4>
                <h5>narxi: <span>{item?.start_point} XP</span></h5>
                <h6>mavjud<span> {item?.amount}</span> </h6>
              </div>
            </>

          })}


        </div>
      </div>
    </>
  );
}

export default Auction;

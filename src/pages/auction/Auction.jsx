import React, { useEffect, useState, useMemo } from "react";
import "./Auction.css";
import { IoIosArrowBack } from "react-icons/io";
import { baseUrl } from "../../config";
import { getToken } from "../../service/token";
import FlipCountdown from "../../components/clock/FlipCountdown";

function Auction({ setLoader }) {
  const [studentPoint, setStudentPoint] = useState(null);
  const [auctionData, setAuctionData] = useState(null);

  useEffect(() => {
    setLoader(true);
    // Parallel API calls for better performance
    Promise.all([getStudentInfo(), getAuctionData()])
      .catch((error) => console.error("Error fetching data:", error))
      .finally(() => setLoader(false));
  }, []);

  const getStudentInfo = async () => {
    try {
      const response = await fetch(`${baseUrl}/students/get-me/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setStudentPoint(result.point);
    } catch (error) {
      console.error("Error fetching student info:", error);
    }
  };

  const getAuctionData = async () => {
    try {
      const response = await fetch(`${baseUrl}/current-auction/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setAuctionData(result);
    } catch (error) {
      console.error("Error fetching auction data:", error);
    }
  };

  const dateTimeString = useMemo(() => {
    if (auctionData?.date && auctionData?.time) {
      return `${auctionData.date}T${auctionData.time}`;
    }
    return null;
  }, [auctionData]);

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

  const memoizedCountdown = useMemo(() => {
    return <FlipCountdown targetTime={dateTime} />;
  }, [dateTime]);

  return (
    <>
      <div className="pageName">
        <IoIosArrowBack />
        <h2>Auction</h2>
      </div>
      {studentPoint !== null && (
        <h4 className="auction_point">
          <span>Ball :</span> {studentPoint} XP
        </h4>
      )}
      <div className="auction_data">
        <div className="div">
          <h3>Keyingi auctiongacha qolgan vaqt</h3>
          {memoizedCountdown}
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
          {auctionData?.products?.map((item, index) => (
            <div className="card" key={index}>
              <div className="images">
                <img src={item?.image} alt={item?.name} loading="lazy" />
              </div>
              <h4>{item?.name}</h4>
              <h5>
                narxi: <span>{item?.start_point} XP</span>
              </h5>
              <h6>
                mavjud<span> {item?.amount}</span>
              </h6>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Auction;

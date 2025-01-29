import React, { useEffect, useState, useMemo } from "react";
import "./Auction.css";
import { IoIosArrowBack } from "react-icons/io";
import { baseUrl } from "../../config";
import { getToken } from "../../service/token";
import FlipCountdown from "../../components/clock/FlipCountdown";
import { useNavigate } from "react-router-dom";

function Auction({ setLoader }) {
  const [auctionData, setAuctionData] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    setLoader(true);
    Promise.all([getAuctionData()])
      .catch((error) => { })
      .finally(() => setLoader(false));
  }, []);

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
        <IoIosArrowBack onClick={() => {
          navigate(-1)
        }} />
        <h2>Auction</h2>
      </div>

      <div className="auction_data">
        <div className="div">
          <h3>Keyingi auksiongacha qolgan vaqt</h3>
          {memoizedCountdown}
        </div>
        <div className="div">
          <h3>Sana va vaqt</h3>
          <div className="date">
            <span>{formattedDate}</span> <span>{formattedTime}</span>
          </div>
        </div>
      </div>
      <div className="auction_product">
        <h1>Mahsulotlar</h1>
        <div className="cards">
          {auctionData?.products
            ?.sort((a, b) => a.start_point - b.start_point)
            .map((item, index) => (
              <div className="card" key={index}>
                <div className="images">
                  <img src={item?.image} alt={item?.name} loading="lazy" />
                </div>
                <h4>{item?.name.slice(0, 20)}..</h4>
                <h5>
                  narxi: <span>{item?.start_point} coin</span>
                </h5>
                <h6>
                  mavjud:<span> {item?.amount}</span>
                </h6>
              </div>
            ))}

        </div>
      </div>
    </>
  );
}

export default Auction;

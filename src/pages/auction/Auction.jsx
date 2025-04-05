import React, { useEffect, useState, useMemo } from "react";
import "./Auction.css";
import { IoIosArrowBack } from "react-icons/io";
import { baseUrl } from "../../config";
import { getToken } from "../../service/token";
import FlipCountdown from "../../components/clock/FlipCountdown";
import { useNavigate } from "react-router-dom";

function Auction({ setLoader }) {
  const [auctionData, setAuctionData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoader(true);
    Promise.all([getAuctionData()])
      .catch((error) => {})
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
    } catch (error) {}
  };

  const dateTimeString = useMemo(() => {
    if (auctionData?.date && auctionData?.time) {
      return `${auctionData?.date}T${auctionData?.time}`;
    }
    return null;
  }, [auctionData]);

  const dateTime = dateTimeString ? new Date(dateTimeString) : null;
  const formattedDate = dateTime
    ? dateTime?.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "";
  const formattedTime = dateTime
    ? dateTime?.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    : "";

  const memoizedCountdown = useMemo(() => {
    return <FlipCountdown targetTime={dateTime} />;
  }, [dateTime]);
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <>
      <div className="pageName">
        <IoIosArrowBack
          onClick={() => {
            navigate(-1);
          }}
        />
        <h2>Auction</h2>
      </div>

      {auctionData?.date || auctionData?.time || auctionData?.description ? (
        <>
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
                ?.sort((a, b) => a?.start_point - b?.start_point)
                .map((item, index) => (
                  <div className="card" key={index}>
                    <div className="images">
                      <img src={item?.image} alt={item?.name} loading="lazy" />
                    </div>
                    <div
                      style={{ position: "relative", display: "inline-block" }}
                    >
                      <h4
                        key={item.id}
                        onMouseEnter={() => setHoveredId(item.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        style={{
                          maxWidth: "200px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {item.name.length > 20
                          ? hoveredId === item.id
                            ? item.name // matnni to'liq ko'rsatish
                            : `${item.name.slice(0, 20)}..`
                          : item.name}
                      </h4>

                      {hoveredId === item.id && item.name.length > 10 && (
                        <div
                          style={{
                            position: "absolute",
                            top: "100%",            
                            left: 0,
                            background: "white",
                            padding: "5px 10px",
                            fontSize:"14px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                            zindex: 10,
                            whiteSpace: "normal",
                            // minWidth:"200px",
                            maxWidth: "400px",
                          }}
                        >
                          {item.name}
                        </div>
                      )}
                    </div>

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
      ) : (
        <div className="auction_data">
          <div className="div">
            <h3>Auksion sanasi belgilanmagan</h3>
          </div>
        </div>
      )}
    </>
  );
}

export default Auction;

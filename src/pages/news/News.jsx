import React, { useEffect, useState } from "react";
import "./News.css"
import { Link, useNavigate } from "react-router-dom";
import { getToken } from "../../service/token";
import { baseUrl } from "../../config";
import { IoIosArrowBack } from "react-icons/io";

function News({ getNewsStatus, setLoader, allNewsStatus }) {
  const [newData, setNewData] = useState()
  const navigate = useNavigate()
  const getNews = () => {
    setLoader(true)
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer  ${getToken()}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch(`${baseUrl}/news/`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setNewData(result.reverse())
        setLoader(false)

      })
      .catch((error) => {
        setLoader(false)
      });
  }




  function formatDate(createdAt) {
    const date = new Date(createdAt);

    const formattedDate = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}, ${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;

    return formattedDate;
  }


  useEffect(() => {
    getNews()
    getNewsStatus()
  }, [getToken])
  return (
    <>
      <div className="news">
        <div className="pageName">
          <IoIosArrowBack onClick={() => {
            navigate(-1)
          }} />
          <h2>Yangiliklar</h2>
        </div>
        <div className="new_cards">
          {
            newData?.map((item, index) => {
              return <Link key={index} to={`/newread/${item?.id}`} className={allNewsStatus?.unread_news_ids.includes(item.id) ? "new_box active " : "new_box "} >
                <div className="imgs">
                  {
                    item.image ? <img src={item.image} alt="" /> : <h2>codi<span>a</span>l <br />
                      <b>news</b>
                    </h2>
                  }

                </div>
                <div className="new_info">
                  <h2>
                    {item?.title}
                  </h2>
                  <p>{item?.description.slice(0, 150)}...</p>
                  {item?.point ? <h6> Point miqdori
                    <b> {item?.point} </b> point
                  </h6> : ""}
                  <span>
                    {formatDate(item?.created_at)}
                  </span>


                </div>
              </Link>

            })
          }


        </div>
      </div>
    </>
  );
}

export default News;

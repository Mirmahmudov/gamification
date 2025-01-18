import React, { useEffect, useState } from "react";
import "./News.css"
import { Link } from "react-router-dom";
import { getToken } from "../../service/token";
import { baseUrl } from "../../config";

function News({ getNewsStatus, setLoader, allNewsStatus }) {
  const [newData, setNewData] = useState()
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
        setNewData(result)
        setLoader(false)

      })
      .catch((error) => {
        console.error(error)
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
        <h1>yangiliklar</h1>
        <div className="new_cards">
          {
            newData?.map((item, index) => {
              console.log();

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
                    {item.title}
                  </h2>
                  <p>{item.description.slice(0, 150)}...</p>
                  <span>
                    {formatDate(item.created_at)}
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

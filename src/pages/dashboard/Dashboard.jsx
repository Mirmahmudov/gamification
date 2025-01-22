import React, { useState, useEffect } from 'react';
import "./Dashboard.css";
import { getToken } from '../../service/token';
import { baseUrl } from '../../config';

function Dashboard({ setLoader }) {
  const [data, setData] = useState();

  const getData = () => {
    setLoader(true)
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getToken()}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch(`${baseUrl}/average-points/`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setLoader(false)
        setData(result);
      })
      .catch((error) => {
        console.error(error)
        setLoader(false)
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="backend-data">
        {data?.map((item, index) => {
          const key = Object.keys(item)[0];
          const stats = item[key];
          return (
            <div key={index} className="col">
              <div className="header">
                <h2>{key}</h2>
              </div>
              <div className="data">
                {Object.keys(stats).map((stat, idx) => (
                  <div className="stat" key={idx}>
                    <span className="stat-label">{stat}:</span>
                    <span className="stat-value">
                      {Number(stats[stat]).toFixed(0)} {/* Sonlarni butun qilib chiqarish */}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Dashboard;

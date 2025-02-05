import React, { useEffect, useState } from 'react'
import "./PointHistory.css"
import { getToken } from '../../service/token';
import { baseUrl } from '../../config';
import { IoIosArrowBack } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';

function PointHistory({ setLoader }) {
  const [pointData, setPointData] = useState()
  const [typeData, setTypeData] = useState()
  const [studentInfo, setStudentInfo] = useState()
  const [studentId, setStudentId] = useState()
  const navigate = useNavigate()


  const getStudentInfo = () => {
    setLoader(true)
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getToken()}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch(`${baseUrl}/students/get-me/ `, requestOptions)
      .then((response) => response.json())

      .then((result) => {
        setStudentInfo(result)
        setStudentId(result?.id)
        setLoader(false)
      })
      .catch((error) => { setLoader(false) });
  }
  const getPoints = () => {
    setLoader(true)
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getToken()}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch(`${baseUrl}/give-points/?student=${studentId}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setPointData(result?.reverse());
        setLoader(false)
      })
      .catch((error) => {
        setLoader(false)
      });
  }

  const getPointsType = () => {
    setLoader(true)
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getToken()}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch(`${baseUrl}/point-types/`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setTypeData(result)
        setLoader(false)

      })
      .catch((error) => {
        setLoader(false)
      });
  }
  useEffect(() => {
    getPointsType()
    getStudentInfo()
  }, [])

  useEffect(() => {
    if (studentId) {
      getPoints();
    }
  }, [studentId]);

  const onePointType = (id) => {
    return typeData?.find((item) => item.id == id);
  }
  const formatDate = (isoString) => {
    // Sana va vaqtni JavaScript formatiga o'tkazish
    const date = new Date(isoString);

    // Haftaning kunlari va oylarning tarjimalari
    const weekdays = [
      "Dushanba",
      "Seshanba",
      "Chorshanba",
      "Payshanba",
      "Juma",
      "Shanba",
      "Yakshanba",
    ];
    const months = [
      "yanvar",
      "fevral",
      "mart",
      "aprel",
      "may",
      "iyun",
      "iyul",
      "avgust",
      "sentyabr",
      "oktyabr",
      "noyabr",
      "dekabr",
    ];

    // Kerakli ma'lumotlarni olish
    const weekday = weekdays[date.getDay()]; // Haftaning kuni (0-6)
    const day = date.getDate(); // Kun
    const month = months[date.getMonth()]; // Oy (0-11)
    const year = date.getFullYear(); // Yil

    return `${weekday}, ${day}-${month}, ${year}`;
  };



  return (
    <>
      <div className="pageName">
        <IoIosArrowBack onClick={() => {
          navigate(-1)
        }} />
        <h2>Coinlar</h2>
      </div>
      <div className="pointhistory">
        {
          pointData?.length == 0 ? "Sizda coinlar mavjud emas😢" : pointData?.map((item, index) => {
            return <Link
            //  to={`/onepoint/${item.id}`}
             key={index}>

              <div className="row" key={index}>
                <div className="div">
                  <div className="imgs">
                    <img src="imgs/coin-3.png" alt="" />
                  </div>
                  <div className="pointHistoryInfo">
                    <h3>{onePointType(item.point_type)?.name || "Noma'lum turi"}
                    </h3>
                    <p>{item?.description ? item?.description : "point uchun izoh mavjud emas"}</p>

                    <h5>
                      {formatDate(item?.created_at)}
                    </h5>
                  </div>
                </div>
                <div className="pointHistoryNumber">
                  +{item?.amount} coin
                </div>

              </div>

            </Link>
          })
        }

      </div>

    </>
  )
}

export default PointHistory
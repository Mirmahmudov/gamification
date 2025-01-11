import React, { useEffect, useState } from "react";
import "./Assessment.css";
import { CiSearch } from "react-icons/ci";
import { getToken } from "../../service/token";
import { baseUrl } from "../../config";
import GivePoint from "../../components/givePointModal/GivePoint";
import { NavLink } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";

function Assessment({ courses, userInfo }) {
  const [students, setStudents] = useState(null);
  const [showGivePoint, setShowGivePoint] = useState(false);
  const [amount, setAmount] = useState(null);
  const [description, setDescription] = useState(null);
  const [date, setDate] = useState(null);
  const [point_type, setPoint_type] = useState(null);
  const [mentor, setMentor] = useState(null);
  const [student, setStudent] = useState(null);

  const getMentor = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getToken()}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${baseUrl}/mentors/get-me`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setMentor(result?.id);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getStudents();
    getMentor();
  }, [getToken()]);

  const getStudents = (id) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getToken()}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${baseUrl}/students/?${id ? id : ""}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setStudents(result);
      })
      .catch((error) => console.error(error));
  };

  const givePoint = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${getToken()}`);

    const raw = JSON.stringify({
      amount,
      description,
      date,
      mentor,
      student,
      point_type,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${baseUrl}/give-points/`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setShowGivePoint(false);
        getStudents();
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="assessment">
      <GivePoint
        userInfo={userInfo}
        givePoint={givePoint}
        setAmount={setAmount}
        setDescription={setDescription}
        setDate={setDate}
        setPoint_type={setPoint_type}
        courses={courses}
        isOpen={showGivePoint}
        onClose={() => setShowGivePoint(false)}
      />
      <header className="header">
        <div>
          <select
            onChange={(e) => {
              getStudents(`group=${e.target.value}`);
            }}
            className="dropdown"
            name=""
            id=""
          >
            <option value={""}>Barchasi</option>;
            {courses?.map((item) => {
              return <option value={item?.id}>{item?.name}</option>;
            })}
          </select>
          <input
            onInput={(e) => {
              console.log(e.target.value);
            }}
            className="dropdown"
            type="date"
          />
        </div>

        <NavLink to="/newadded" className={"recent-add"}>
          Yaqinda qo'shildi
        </NavLink>
      </header>

      <section className="content">
        <div className="content_head">
          <h2 className="title">O'quvchilar</h2>

          <div className="search-filter">
            <div className="input_box">
              <CiSearch />
              <input type="text" placeholder="Search" />
            </div>
            {/* <select name="" id="" className="gradeType">
              <option value="">Davomat</option>
              <option value="">Davomat</option>
              <option value="">Davomat</option>
              <option value="">Davomat</option>
            </select> */}
          </div>
        </div>
        <hr />

        <ul className="students-list">
          {students?.map((item, index) => {
            return (
              <li key={index} className="student-item">
                <div className="student-info">
                  <div className="avatar">
                    {item?.image ? (
                      <img src={`${baseUrl}/docs/${item?.image}`} alt="" />
                    ) : (
                      <FaRegUser />
                    )}
                  </div>
                  <div>
                    <p className="student-name">
                      {item.user?.first_name || item.user?.last_name ? (
                        <>
                          {item.user?.first_name} {item.user?.last_name}
                        </>
                      ) : (
                        <>Ism mavjud emas</>
                      )}
                    </p>
                    <p className="student-description">
                      {item.bio ? item.bio : "ma'lumot mavjud emas"}
                    </p>
                  </div>
                </div>
                <div className="student-actions">
                  <span className="xp">{item.point ? item.point : 0} XP</span>
                  <button
                    onClick={() => {
                      setStudent(item.id);
                      setShowGivePoint(true);
                    }}
                    className="recent-add"
                  >
                    Rag'batlantirish
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

export default Assessment;

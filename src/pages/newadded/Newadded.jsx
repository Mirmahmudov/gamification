import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Newadded.css";
import { CiSearch } from "react-icons/ci";
import { getToken } from "../../service/token";
import { baseUrl } from "../../config";

function Newadded({ courses }) {
  const [students, setStudents] = useState(null);

  const getStudents = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getToken()}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${baseUrl}/students/`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setStudents(result);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <>
      <header className="header">
        <div>
          <select className="dropdown" name="" id="">
            {courses?.map((item) => {
              return <option value="">{item.name}</option>;
            })}
          </select>
          <input className="dropdown" type="date" />
        </div>

        <NavLink to="/assessment" className={"recent-add new_add"}>
          Baholash
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
                  <div className="avatar"></div>
                  <div>
                    <p className="student-name">
                      {item.user.first_name} {item.user.last_name}
                    </p>
                    <p className="student-description">{item.bio}</p>
                  </div>
                </div>
                <div className="student-actions">
                  <span className="xp">{item.point} XP</span>
                  <div className="btns">
                    <button className="recent-add">Tahrirlash</button>
                    <button className="recent-add del">O’chirish</button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}

export default Newadded;

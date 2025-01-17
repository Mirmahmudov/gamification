import React, { useEffect, useState } from "react";
import "./Assessment.css";
import { CiSearch } from "react-icons/ci";
import { getToken } from "../../service/token";
import { baseUrl } from "../../config";
import GivePoint from "../../components/givePointModal/GivePoint";
import { NavLink } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { Autocomplete, TextField } from "@mui/material";

function Assessment({ courses, userInfo, setLoader }) {
  const [students, setStudents] = useState(null);
  const [showGivePoint, setShowGivePoint] = useState(false);
  const [amount, setAmount] = useState(null);
  const [description, setDescription] = useState(null);
  const [date, setDate] = useState(null);
  const [point_type, setPoint_type] = useState(null);
  const [mentor, setMentor] = useState(null);
  const [student, setStudent] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Qidiruv query

  const getMentor = () => {
    setLoader(true);
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
        setLoader(false);
      })
      .catch((error) => {
        console.error(error);
        setLoader(false);
      });
  };

  useEffect(() => {
    getStudents();
    getMentor();
  }, [getToken()]);

  const getStudents = (id) => {
    setLoader(true);
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
        setLoader(false);
      })
      .catch((error) => {
        console.error(error);
        setLoader(false);
      });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredStudents = students?.filter((student) => {
    const fullName =
      `${student.user?.first_name} ${student.user?.last_name}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  const givePoint = () => {
    setLoader(true);
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
        setShowGivePoint(false);
        getStudents();
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
        console.error(error);
      });
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
          <Autocomplete
            disablePortal
            options={courses && Array.isArray(courses) ? courses : []} // courses array bo'lishini tekshirish
            getOptionLabel={(option) => option?.name || ""} // option?.name bo'lishini tekshirib, bo'sh qiymatni oldini olish
            sx={{ width: 300, padding: "0px" }}
            onChange={(event, value) => {
              getStudents(`group=${value?.id || ""}`); // Agar value bo'sh bo'lsa, default qiymat sifatida "" yuboriladi
            }}
            renderInput={(params) => (
              <TextField {...params} label="Kursni tanlang" />
            )}
            isOptionEqualToValue={(option, value) => option?.id === value?.id} // ikkalasi teng bo'lishi kerak
            className="custom-autocomplete"
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
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search"
              />
            </div>
          </div>
        </div>
        <hr />

        <ul className="students-list">
          {filteredStudents?.map((item, index) => {
            return (
              <li key={index} className="student-item">
                <div className="student-info">
                  <div className="avatar">
                    {item?.image ? (
                      <img src={`${item?.image}`} alt="" />
                    ) : (
                      <FaRegUser />
                    )}
                  </div>
                  <div>
                    <p className="student-name">
                      {item?.user?.first_name || item?.user?.last_name ? (
                        <>
                          {item?.user?.first_name} {item?.user?.last_name}
                        </>
                      ) : (
                        <>Ism mavjud emas</>
                      )}
                    </p>
                    <p className="student-description">
                      {item?.bio ? item.bio : "ma'lumot mavjud emas"}
                    </p>
                  </div>
                </div>
                <div className="student-actions">
                  <span className="xp">{item?.point ? item?.point : 0} XP</span>
                  <button
                    onClick={() => {
                      setStudent(item?.id);
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

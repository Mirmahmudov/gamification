import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Newadded.css";
import { CiSearch } from "react-icons/ci";
import { getToken } from "../../service/token";
import { baseUrl } from "../../config";
import { FaRegUser } from "react-icons/fa";
import { Autocomplete, TextField } from "@mui/material";

function Newadded({ courses, setLoader }) {
  const [students, setStudents] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Qidiruv so'rovi uchun state

  const daletStudent = (id) => {
    setLoader(true);
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getToken()}`);

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${baseUrl}/students/${id}/`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        setLoader(false);
        // O'chirilgandan keyin sahifani yangilash
        getStudents();
      })
      .catch((error) => {
        console.error(error);
        setLoader(false);
      });
  };

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

  useEffect(() => {
    getStudents();
  }, []);

  // Filtered students based on search query
  const filteredStudents = students?.filter((student) => {
    const fullName =
      (student?.user?.first_name || "").toLowerCase() +
      " " +
      (student?.user?.last_name || "").toLowerCase();
    return fullName.includes(searchQuery.toLowerCase()); // Match with the search query
  });

  return (
    <>
      <header className="header">
        <div>
          <Autocomplete
            disablePortal
            options={courses || []} // Kurslar ro'yxati
            getOptionLabel={(option) =>
              option?.name ? option.name : "Barchasi"
            } // Kurs nomlari
            onChange={(event, value) => {
              // Kurs tanlanganda getStudents funksiyasiga group qiymati yuboriladi
              getStudents(`group=${value?.id || ""}`);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label=" Barcha guruhlar"
                variant="outlined"
              />
            )}
            sx={{ width: 300, margin: "0 auto" }} // Dizayn uchun uslublar
            isOptionEqualToValue={(option, value) => option.id === value?.id}
            className="custom-autocomplete"
          />
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
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Update search query
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
                    {item.image ? (
                      <img src={`${item.image}`} alt="" />
                    ) : (
                      <FaRegUser />
                    )}
                  </div>
                  <div>
                    <div className="student-name">
                      {item?.user?.first_name || item?.user?.last_name ? (
                        <h3>
                          {item?.user?.first_name} {item?.user?.last_name}
                        </h3>
                      ) : (
                        <h3>Ism mavjud emas</h3>
                      )}
                    </div>
                    <p className="student-description">
                      {item?.bio ? item?.bio : " Bio mavjud emas"}
                    </p>
                  </div>
                </div>
                <div className="student-actions">
                  <span className="xp">{item.point} XP</span>
                  <div className="btns">
                    <button className="recent-add">Tahrirlash</button>
                    <button
                      onClick={() => {
                        daletStudent(item.id);
                      }}
                      className="recent-add del"
                    >
                      O’chirish
                    </button>
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

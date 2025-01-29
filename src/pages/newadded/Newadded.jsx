import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Newadded.css";
import { CiSearch } from "react-icons/ci";
import { getToken } from "../../service/token";
import { baseUrl } from "../../config";
import { FaRegUser } from "react-icons/fa";
import { Autocomplete, TextField } from "@mui/material";

function Newadded({ mentorId, courses, setLoader }) {

  const [students, setStudents] = useState(null);
  const [filteredStudents, setFilteredStudents] = useState(null)
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

    fetch(`${baseUrl}/give-points/${id}/`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setLoader(false);
        getStudents();
      })
      .catch((error) => {
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
      redirect: "follow"
    };

    fetch(`${baseUrl}/give-points/?mentor=${mentorId}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setStudents(result);
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
      });
  };


  useEffect(() => {
    if (mentorId) {
      getStudents();
    }
  }, [mentorId]);

  useEffect(() => {
    if (Array.isArray(students)) {
      const Filtered = students.filter((student) => {
        const fullName =
          (student?.student?.user?.first_name || "").toLowerCase() +
          " " +
          (student?.student?.user?.last_name || "").toLowerCase();
        return fullName.includes(searchQuery?.toLowerCase()); // Match with the search query
      });
      setFilteredStudents(Filtered);
    } else {
      setFilteredStudents([]);
    }
  }, [students, searchQuery]);



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
                    {item?.student?.image ? (
                      <img src={`${item?.student?.image}`} alt="" />
                    ) : (
                      <FaRegUser />
                    )}
                  </div>
                  <div>
                    <div className="student-name">
                      {item?.student?.user?.first_name || item?.student?.user?.last_name ? (
                        <h3>
                          {item?.student?.user?.first_name} {item?.student?.user?.last_name}
                        </h3>
                      ) : (
                        <h3>Ism mavjud emas</h3>
                      )}
                    </div>
                    <p className="student-description">
                      {item?.student?.bio ? item?.student?.bio : " Bio mavjud emas"}
                    </p>
                  </div>
                </div>
                <div className="student-actions">
                  <span className="xp">{item.amount} Coin</span>
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

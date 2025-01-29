import React, { useEffect, useState } from "react";
import "./Assessment.css";
import { CiSearch } from "react-icons/ci";
import { getToken } from "../../service/token";
import { baseUrl } from "../../config";
import GivePoint from "../../components/givePointModal/GivePoint";
import { NavLink, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { Autocomplete, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { IoIosArrowBack } from "react-icons/io";

function Assessment({ courses, userInfo, setLoader }) {
  const [students, setStudents] = useState(null);
  const [showGivePoint, setShowGivePoint] = useState(false);
  const [amount, setAmount] = useState(null);
  const [description, setDescription] = useState(null);
  const [date, setDate] = useState(null);
  const [point_type, setPoint_type] = useState("1");
  const [mentor, setMentor] = useState(null);
  const [student, setStudent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

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

    fetch(`${baseUrl}/students/?group__mentor=${mentor ? mentor : ""}&${id ? id : ""}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setStudents(result);
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
      });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredStudents = students
    ?.filter((student) => {
      const fullName = `${student.user?.first_name} ${student.user?.last_name}`.toLowerCase();
      return fullName.includes(searchQuery.toLowerCase());
    })
    ?.sort((a, b) => (b.point || 0) - (a.point || 0)); // Point bo'yicha tartiblash

  const givePoint = () => {
    setLoader(true);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${getToken()}`);
    console.log(description);
    
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
        toast.success("Baholandi");
      })
      .catch((error) => {
        setLoader(false);
        toast.error("hatolik mavjud");
      });
  };

  useEffect(() => {
    setDate(getCurrentDate());
    getMentor();
  }, [getToken()]);

  useEffect(() => {
    if (mentor) {
      getStudents();
    }
  }, [mentor]);

  return (
    <div className="assessment">
      <div className="pageName">
        <IoIosArrowBack onClick={() => navigate(-1)} />
        <h2>Baholash</h2>
      </div>
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
            options={courses && Array.isArray(courses) ? courses : []}
            getOptionLabel={(option) => option?.name || ""}
            sx={{ width: 300, padding: "0px" }}
            onChange={(event, value) => {
              getStudents(`group=${value?.id || ""}`);
            }}
            renderInput={(params) => <TextField {...params} label="Barcha guruhlar" />}
            isOptionEqualToValue={(option, value) => option?.id === value?.id}
            className="custom-autocomplete"
          />
        </div>

        <NavLink to="/teacherhistory" className={"recent-add"}>
          Baholar Tarixi
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
          {filteredStudents?.map((item, index) => (
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
                    {item?.user?.first_name || item?.user?.last_name
                      ? `${item?.user?.first_name || ""} ${item?.user?.last_name || ""}`
                      : "Ism mavjud emas"}
                  </p>
                  <p className="student-description">
                    {item?.bio ? item.bio : "ma'lumot mavjud emas"}
                  </p>
                </div>
              </div>
              <div className="student-actions">
                <div className="div">
                  <span className="xp">{item?.point ? item?.point : 0}</span>
                  coins
                </div>
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
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Assessment;

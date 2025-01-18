import React, { useState, useRef, useEffect } from "react";
import "./Navbar.css";
import { FaChevronRight, FaRegUser, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { HiMiniXMark } from "react-icons/hi2";
import { TiInfoLarge } from "react-icons/ti";
import { IoIosNotifications } from "react-icons/io";
import { getToken } from "../../service/token";
import { baseUrl } from "../../config";

function Navbar({ setLoader, setModalOpen, userInfo, allNewsStatus }) {
  const navigate = useNavigate();
  const [userModal, setUserModal] = useState(false);
  const modalRef = useRef(null);
  const [studentInfo, setStudentInfo] = useState(null);



  const getStudentInfo = () => {
    setLoader(true);
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getToken()}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${baseUrl}/students/get-me/`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch student info");
        }
        return response.json();
      })
      .then((result) => {
        setStudentInfo(result);
        setLoader(false);
      })
      .catch((error) => {
        console.error(error);
        setLoader(false);
      });
  };

  useEffect(() => {
    getStudentInfo();
  }, []);

  const handleClickOutside = (e) => {
    if (userModal && modalRef.current && !modalRef.current.contains(e.target)) {
      setUserModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userModal]);

  

  return (
    <>

      <div
        className={`modalBg ${userModal ? "active" : ""}`}
        onClick={() => setUserModal(false)} // Fonga bosganda ham modal yopiladi
      ></div>
      <nav >

        <div className="nav">
          <div className="container">
            <div className="pageTitle">
              <Link to={"/"} className="logo">
                <img src="/imgs/logo.svg" alt="logo" />
              </Link>
              <h1>Gamification</h1>
            </div>
            <div className="user">
              <Link to={"/news"}> <span className="navNotificat" ><IoIosNotifications />
                <b>{allNewsStatus?.num_unread_news}</b> </span>
              </Link>
              <span
                onClick={() => setUserModal(!userModal)} // Modalni ochish/yopish
              >
                <FaUser />
              </span>

              {/* Modal */}
              <div
                ref={modalRef}
                className={`navModal ${userModal ? "active" : ""}`}
              >
                {/* Exit tugmasi */}
                <div onClick={() => setUserModal(false)} className="exit">
                  <HiMiniXMark />
                </div>

                <div className="row">
                  <Link onClick={() => {
                    setUserModal(false);
                  }} to={"/profile"} className="div">
                    <span className="navUserImg">
                      {/* <TiInfoLarge /> */}
                      {studentInfo?.image ? (
                        <img src={studentInfo?.image} alt="" />

                      ) : (
                        <FaUser />
                      )}
                    </span>
                    <h3> {userInfo.first_name} {userInfo.last_name} </h3>
                  </Link>
                  <FaChevronRight />
                </div>
                <hr />

                {/* Ilova haqida */}
                <div className="row">
                  <div className="div">
                    <span>
                      <TiInfoLarge />
                    </span>
                    <h3>Ilova haqida</h3>
                  </div>
                  <FaChevronRight />
                </div>

                {/* Logout */}
                <div
                  className="row"
                  onClick={() => {
                    localStorage.clear();
                    navigate("/");
                    setModalOpen(true);
                    setUserModal(false);
                  }}
                >
                  <div className="div">
                    <span>
                      <MdLogout />
                    </span>
                    <h3>Logout</h3>
                  </div>
                  <FaChevronRight />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

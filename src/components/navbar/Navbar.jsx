import React, { useState, useRef, useEffect } from "react";
import "./Navbar.css";
import { FaBars, FaChevronRight, FaRegUser, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { HiMiniXMark } from "react-icons/hi2";
import { TiInfoLarge } from "react-icons/ti";
import { IoIosNotifications } from "react-icons/io";
import { getToken } from "../../service/token";
import { baseUrl } from "../../config";
import { toast } from "react-toastify";
import { FaBarsStaggered } from "react-icons/fa6";

function Navbar({
  setLoader,
  setModalOpen,
  userInfo,
  allNewsStatus,
  setBarActive,
  barActive,
}) {
  const navigate = useNavigate();
  const [userModal, setUserModal] = useState(false);
  const modalRef = useRef(null);
  const [studentInfo, setStudentInfo] = useState(null);
  const [role, setRole] = useState();

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
        setLoader(false);
      });
  };

  const userRole = () => {
    setLoader(true);

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getToken()}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${baseUrl}/users/get-me/`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setRole(result.role);
        // setUserInfo(result);
        setLoader(false);
      })
      .catch((error) => {
        // console.error(error);
        setLoader(false);
      });
  };

  useEffect(() => {
    userRole();
  }, []);

  useEffect(() => {
    if (role == "student") {
      getStudentInfo();
    }
  }, [role]);

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
      <div className="navBar">
        <div
          className={`modalBg ${userModal ? "active" : ""}`}
          onClick={() => setUserModal(false)} // Fonga bosganda ham modal yopiladi
        ></div>
        <nav>
          <div className="nav">
            <div className="container">
              <div className="pageTitle">
                <Link to={"/"} className={barActive ? "logo active" : "logo"}>
                  {/* <img className="coin_img" src="imgs/coin-3.png" alt="" /> */}
                  <img src="/imgs/logo.svg" alt="logo" />
                </Link>
                {/* <div className="bar">
                  <FaBars onClick={() => {
                    setBarActive(!barActive)
                  }} />
                </div> */}
              </div>
              <div className="user">
                {role == "mentor" ? (
                  ""
                ) : (
                  <>
                    {studentInfo?.point ? (
                      <div className="nav_point">
                        <img src="/imgs/coin-3.png" alt="" />
                        <h3>{studentInfo?.point}</h3>
                      </div>
                    ) : (
                      <div className="nav_point">
                        <img src="/imgs/coin-3.png" alt="" />
                        <h3>0</h3>
                      </div>
                    )}
                  </>
                )}

                <div className="flex">
                  <Link to={"/news"}>
                    {" "}
                    <span className="navNotificat">
                      <IoIosNotifications />
                      {allNewsStatus?.num_unread_news != 0 ? (
                        <b>{allNewsStatus?.num_unread_news}</b>
                      ) : (
                        ""
                      )}
                    </span>
                  </Link>
                  <span
                    onClick={() => setUserModal(!userModal)} // Modalni ochish/yopish
                  >
                    <FaUser />
                  </span>
                </div>
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
                    <Link
                      onClick={() => {
                        setUserModal(false);
                      }}
                      to={role == "mentor" ? "" : "/profile"}
                      className="div"
                    >
                      <span className="navUserImg">
                        {/* <TiInfoLarge /> */}
                        {studentInfo?.image ? (
                          <img src={studentInfo?.image} alt="" />
                        ) : (
                          <FaUser />
                        )}
                      </span>
                      <h3>
                        {" "}
                        {userInfo.first_name} {userInfo.last_name}{" "}
                      </h3>
                    </Link>
                    <FaChevronRight />
                  </div>

                  {/* Ilova haqida */}
                  <div className="row">
                    <Link
                      to={"/info"}
                      onClick={() => {
                        setUserModal(false);
                      }}
                      className="div"
                    >
                      <span>
                        <TiInfoLarge />
                      </span>
                      <h3> Baholash nizomi</h3>
                    </Link>
                    <FaChevronRight />
                  </div>
                  <hr />

                  {/* Logout */}
                  <div
                    className="row"
                    onClick={() => {
                      localStorage.clear();

                      setModalOpen(true);
                      setUserModal(false);
                      toast.success("Tizimdan muvafaqqiyatli chiqdingiz");
                      window.location.reload();
                      navigate("/");
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
      </div>
    </>
  );
}

export default Navbar;

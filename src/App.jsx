import React, { useEffect, useState } from "react";
import { BrowserRouter, Link, NavLink, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import { RiAuctionLine, RiDashboardLine } from "react-icons/ri";
import {
  FaArrowLeft,
  FaArrowRight,
  FaBars,
  FaChevronRight,
  FaHistory,
  FaRegUser,
} from "react-icons/fa";
import "./App.css";
import {
  MdArrowBackIosNew,
  MdArrowForwardIos,
  MdOutlineAssessment,
  MdOutlineLeaderboard,
  MdOutlineWatchLater,
  MdWhatshot,
} from "react-icons/md";
import Dashboard from "./pages/dashboard/Dashboard";
import Assessment from "./pages/assessment/Assessment";
import Auction from "./pages/auction/Auction";
import { getToken } from "./service/token";
import { baseUrl } from "./config";
import News from "./pages/news/News";
import Profile from "./pages/profile/Profile";
import Loader from "./components/loader/Loader";
import Students from "./pages/students/Students";
import NewRead from "./pages/newRead/NewRead";
import LoginPage from "./components/loginPage/LoginPage";
import { ToastContainer } from "react-toastify";
import PointHistory from "./components/pointHistory/PointHistory";
import PointHistoryTeacher from "./components/pointHistoryTeacher/PointHistoryTeacher";
import EditPointHistory from "./components/pointHistoryTeacher/EditPointHistory";
import { GoHistory } from "react-icons/go";
import OnePoint from "./components/onePoint/OnePoint";
import SiteInfo from "./pages/siteInfo/SiteInfo";
import AssessmentTwo from "./pages/assessmentTwo/AssessmentTwo";

function App() {
  const [isModalOpen, setModalOpen] = useState(getToken() ? false : true);
  const [courses, setCourses] = useState(null);
  const [role, setRole] = useState();
  const [userInfo, setUserInfo] = useState();
  const [loader, setLoader] = useState(false);
  const [mentorInfo, setMentorInfo] = useState();
  const [mentorId, setMentorId] = useState(null);
  const [allNewsStatus, setAllNewsStatus] = useState();
  const [barActive, setBarActive] = useState(false);

  const getNewsStatus = () => {
    setLoader(true);
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer  ${getToken()}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${baseUrl}/news/get-read-status/`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setAllNewsStatus(result);
        setLoader(false);
      })
      .catch((error) => {
        // console.error(error)
        setLoader(false);
      });
  };

  const getMentorInfo = () => {
    setLoader(true);
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getToken()}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${baseUrl}/mentors/get-me/`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setLoader(false);
        setMentorInfo(result);
        setMentorId(result.id); // mentorId ni to'g'ri oling
      })
      .catch((error) => {
        setLoader(false);
      });
  };

  const getCourses = () => {
    if (!mentorId) return; // Agar mentorId yo'q bo'lsa, so'rov yubormaslik
    setLoader(true);
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getToken()}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${baseUrl}/groups/?mentor=${mentorId}&active=true`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setCourses(result);
        setLoader(false);
      })
      .catch((error) => {
        // console.error(error);
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
        if (result?.role || result?.id) {
          setRole(result?.role);
          setUserInfo(result);
          setLoader(false);
        } else {
          localStorage.clear();
          if (window.location.pathname !== "/") {
            window.location.href = "/";
          }
          // window.location.reload()
        }
      })
      .catch((error) => {
        // console.error(error);
        setLoader(false);
      });
  };

  useEffect(() => {
    userRole();
    getNewsStatus();
  }, [getToken()]);

  useEffect(() => {
    if (role == "mentor") {
      getMentorInfo();
    }
  }, [role]);

  useEffect(() => {
    if (mentorId) {
      getCourses();
    }
  }, [mentorId]);

  return (
    <>
      <BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        {loader ? <Loader /> : ""}
        <LoginPage
          isOpen={isModalOpen}
          setLoader={setLoader}
          onClose={() => setModalOpen(false)}
        />

        {role ? (
          <Navbar
            barActive={barActive}
            setBarActive={setBarActive}
            allNewsStatus={allNewsStatus}
            setLoader={setLoader}
            setModalOpen={setModalOpen}
            userInfo={userInfo}
          />
        ) : (
          ""
        )}

        {role == "mentor" ? (
          <div className="main container">
            <ul className={barActive ? "links active " : "links "}>
              <div className="bar">
                {barActive ? (
                  <MdArrowForwardIos
                    onClick={() => {
                      setBarActive(!barActive);
                    }}
                  />
                ) : (
                  <MdArrowBackIosNew
                    onClick={() => {
                      setBarActive(!barActive);
                    }}
                  />
                )}
              </div>

              <li>
                <NavLink to={"/"}>
                  <div>
                    <RiDashboardLine />
                    <h3>Dashboard</h3>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/assessment"}>
                  <div>
                    <MdOutlineAssessment />
                    <h3>Baholash</h3>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/news"}>
                  <div>
                    <MdOutlineWatchLater />
                    <h3>Yangiliklar</h3>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/leaderboard"}>
                  <div>
                    <MdOutlineLeaderboard />
                    <h3>Leaderboard</h3>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/auction"}>
                  <div>
                    <RiAuctionLine />
                    <h3>Auksion</h3>
                  </div>
                </NavLink>
              </li>
            </ul>
            <ul className="links_two">
              <li>
                <NavLink to={"/"}>
                  <div>
                    <RiDashboardLine />
                    <h3>Dashboard</h3>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/assessment"}>
                  <div>
                    <MdOutlineAssessment />
                    <h3>Baholash</h3>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/news"}>
                  <div>
                    <MdOutlineWatchLater />
                    <h3>Yangiliklar</h3>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/leaderboard"}>
                  <div>
                    <MdOutlineLeaderboard />
                    <h3>Leaderboard</h3>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/auction"}>
                  <div>
                    <RiAuctionLine />
                    <h3>Auksion</h3>
                  </div>
                </NavLink>
              </li>
            </ul>
            <div className="viewPage">
              <Routes>
                <Route path="/" element={<Dashboard setLoader={setLoader} />} />
                <Route path="/info" element={<SiteInfo />} />

                {/* <Route
                  path="/assessment"
                  element={
                    <Assessment setLoader={setLoader} courses={courses} />
                  }
                /> */}
                <Route
                  path="/assessment"
                  element={
                    <AssessmentTwo setLoader={setLoader} courses={courses} />
                  }
                />

                <Route
                  path="/leaderboard"
                  element={
                    <Students
                      role={role}
                      mentorId={mentorId}
                      setLoader={setLoader}
                    />
                  }
                />
                <Route
                  path="/news"
                  element={
                    <News
                      getNewsStatus={getNewsStatus}
                      allNewsStatus={allNewsStatus}
                      setLoader={setLoader}
                    />
                  }
                />

                <Route
                  path="/auction"
                  element={<Auction setLoader={setLoader} />}
                />
                <Route
                  path="/teacherhistory"
                  element={
                    <PointHistoryTeacher
                      mentorId={mentorId && mentorId}
                      courses={courses}
                      setLoader={setLoader}
                    />
                  }
                />
                <Route
                  path="newread/:id"
                  element={<NewRead setLoader={setLoader} />}
                />
                <Route
                  path="/edithistory/:id"
                  element={
                    <EditPointHistory
                      setLoader={setLoader}
                      mentorId={mentorId && mentorId}
                    />
                  }
                />
              </Routes>
            </div>
          </div>
        ) : role === "student" ? (
          <div className="main container">
            <ul className={barActive ? "links active " : "links "}>
              <div className="bar">
                {barActive ? (
                  <MdArrowForwardIos
                    onClick={() => {
                      setBarActive(!barActive);
                    }}
                  />
                ) : (
                  <MdArrowBackIosNew
                    onClick={() => {
                      setBarActive(!barActive);
                    }}
                  />
                )}
              </div>
              {/* <li>
                <NavLink to={"/"}>
                  <div>
                    <MdOutlineLeaderboard />
                    <h3>Leaderboard </h3>
                  </div>
                </NavLink>
              </li> */}
              <li>
                <NavLink to={"/"}>
                  <div>
                    <RiAuctionLine />
                    <h3>Auksion</h3>
                  </div>
                </NavLink>
              </li>

              <li>
                <NavLink to={"/news"}>
                  <div>
                    <MdOutlineWatchLater />
                    <h3>Yangiliklar</h3>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/profile"}>
                  <div>
                    <FaRegUser />
                    <h3>Profil</h3>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/pointhistory"}>
                  <div>
                    <GoHistory />
                    <h3>Coinlar</h3>
                  </div>
                </NavLink>
              </li>
            </ul>
            <ul className="links_two">
              {/* <li>
                <NavLink to={"/"}>
                  <div>
                    <MdWhatshot />
                    <h3>Leaderboard </h3>
                  </div>
                </NavLink>
              </li> */}
              <li>
                <NavLink to={"/"}>
                  <div>
                    <RiAuctionLine />
                    <h3>Auksion</h3>
                  </div>
                </NavLink>
              </li>

              <li>
                <NavLink to={"/news"}>
                  <div>
                    <MdOutlineWatchLater />
                    <h3>Yangiliklar</h3>
                  </div>
                </NavLink>
              </li>

              <li>
                <NavLink to={"/pointhistory"}>
                  <div>
                    <GoHistory />
                    <h3>Coinlar</h3>
                  </div>
                </NavLink>
              </li>
            </ul>
            <div className="viewPage">
              <Routes>
                <Route
                  path="/news"
                  element={
                    <News
                      getNewsStatus={getNewsStatus}
                      allNewsStatus={allNewsStatus}
                      setLoader={setLoader}
                    />
                  }
                />
                <Route path="/info" element={<SiteInfo />} />
                <Route
                  path="/profile"
                  element={<Profile setLoader={setLoader} />}
                />
                <Route path="/" element={<Auction setLoader={setLoader} />} />
                {/* <Route path="/" element={<Students setLoader={setLoader} />} /> */}
                <Route
                  path="newread/:id"
                  element={<NewRead setLoader={setLoader} />}
                />

                <Route
                  path="/pointhistory"
                  element={<PointHistory setLoader={setLoader} />}
                />
                <Route
                  path="/onepoint/:id"
                  element={<OnePoint setLoader={setLoader} />}
                />
              </Routes>
            </div>
          </div>
        ) : (
          ""
        )}
      </BrowserRouter>
    </>
  );
}

export default App;

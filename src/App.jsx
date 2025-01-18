import React, { useEffect, useState } from "react";
import { BrowserRouter, Link, NavLink, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import { RiAuctionLine, RiDashboardLine } from "react-icons/ri";
import { FaChevronRight, FaRegUser } from "react-icons/fa";
import "./App.css";
import {
  MdOutlineAssessment,
  MdOutlineLeaderboard,
  MdOutlineWatchLater,
  MdWhatshot,
} from "react-icons/md";
import Dashboard from "./pages/dashboard/Dashboard";
import Assessment from "./pages/assessment/Assessment";
import Attendance from "./pages/attendance/Attendance";
import LeaderBoard from "./pages/leaderboard/LeaderBoard";
import Auction from "./pages/auction/Auction";
import LoginModal from "./components/loginModal/LoginModal";
import { getToken } from "./service/token";
import { baseUrl } from "./config";
import News from "./pages/news/News";
import Profile from "./pages/profile/Profile";
import Student from "./pages/student/Student";
import Newadded from "./pages/newadded/Newadded";
import Loader from "./components/loader/Loader";
import Students from "./pages/students/Students";
import NewRead from "./pages/newRead/NewRead";
import LoginPage from "./components/loginPage/LoginPage";

function App() {
  const [isModalOpen, setModalOpen] = useState(getToken() ? false : true);
  const [courses, setCourses] = useState(null);
  const [role, setRole] = useState();
  const [userInfo, setUserInfo] = useState();
  const [loader, setLoader] = useState(false);
  const [mentorInfo, setMentorInfo] = useState()
  const [mentorId, setMentorId] = useState()
  const [allNewsStatus, setAllNewsStatus] = useState()


  const getNewsStatus = () => {
    setLoader(true)
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer  ${getToken()}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch(`${baseUrl}/news/get-read-status/`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setAllNewsStatus(result)
        setLoader(false)
      })
      .catch((error) => {
        console.error(error)
        setLoader(false)
      });
  }

  const getMentorInfo = () => {
    setLoader(true)
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getToken()}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch(`${baseUrl}/mentors/get-me/`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setLoader(false)
        setMentorInfo(result);
        setMentorId(result?.id); // mentorId ni to'g'ri oling
      })
      .catch((error) => {
        setLoader(false)
        console.error(error)
      });
  }

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

    fetch(`${baseUrl}/groups/?mentor=${mentorId}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setCourses(result);
        setLoader(false);
      })
      .catch((error) => {
        console.error(error);
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
        setUserInfo(result);
        setLoader(false);
      })
      .catch((error) => {
        console.error(error);
        setLoader(false);
      });
  };

  useEffect(() => {
    userRole();
    getMentorInfo()
    getNewsStatus()
  }, [getToken()]);

  useEffect(() => {
    getMentorInfo();
  }, []);

  useEffect(() => {
    if (mentorId) {
      getCourses();
    }
  }, [mentorId]);

  return (
    <>
      <BrowserRouter>
        {loader ? <Loader /> : ""}
        {/* <LoginPage /> */}

        <LoginModal
          isOpen={isModalOpen}
          setLoader={setLoader}
          onClose={() => setModalOpen(false)}
        />
        {role ? <Navbar allNewsStatus={allNewsStatus} setLoader={setLoader} setModalOpen={setModalOpen} userInfo={userInfo} /> : ""}

        {role == "mentor" ? (
          <div className="main container">
            <ul className="links">
              <li>
                <NavLink to={"/"}>
                  <div>
                    <RiDashboardLine />
                    <h3>Dashboard</h3>
                  </div>
                  <FaChevronRight />
                </NavLink>
              </li>
              <li>
                <NavLink to={"/assessment"}>
                  <div>
                    <MdOutlineAssessment />
                    <h3>Baholash</h3>
                  </div>
                  <FaChevronRight />
                </NavLink>
              </li>
              <li>
                <NavLink to={"/news"}>
                  <div>
                    <MdOutlineWatchLater />
                    <h3>Yangiliklar</h3>
                  </div>
                  <FaChevronRight />
                </NavLink>
              </li>
              <li>
                <NavLink to={"/leaderboard"}>
                  <div>
                    <MdOutlineLeaderboard />
                    <h3>Leaderboard</h3>
                  </div>
                  <FaChevronRight />
                </NavLink>
              </li>
              <li>
                <NavLink to={"/auction"}>
                  <div>
                    <RiAuctionLine />
                    <h3>Auksion</h3>
                  </div>
                  <FaChevronRight />
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
                <Route path="/" element={<Dashboard />} />
                <Route
                  path="/assessment"
                  element={
                    <Assessment setLoader={setLoader} courses={courses} />
                  }
                />
                <Route
                  path="/attendance"
                  element={<Attendance setLoader={setLoader} />}
                />
                <Route
                  path="/leaderboard"
                  element={<Students setLoader={setLoader} />}
                />
                <Route path="/news" element={<News getNewsStatus={getNewsStatus} allNewsStatus={allNewsStatus} setLoader={setLoader} />} />

                <Route
                  path="/auction"
                  element={<Auction setLoader={setLoader} />}
                />
                <Route
                  path="/newadded"
                  element={<Newadded courses={courses} setLoader={setLoader} />}
                />
                <Route path="newread/:id" element={<NewRead setLoader={setLoader} />} />

              </Routes>
            </div>
          </div>
        ) : role === "student" ? (
          <div className="main container">
            <ul className="links">
              <li>
                <NavLink to={"/"}>
                  <div>
                    <MdWhatshot />
                    <h3>Leaderboard </h3>
                  </div>
                  <FaChevronRight />
                </NavLink>
              </li>
              <li>
                <NavLink to={"/auction"}>
                  <div>
                    <RiAuctionLine />
                    <h3>Auksion</h3>
                  </div>
                  <FaChevronRight />
                </NavLink>
              </li>

              <li>
                <NavLink to={"/news"}>
                  <div>
                    <MdOutlineWatchLater />
                    <h3>Yangiliklar</h3>
                  </div>
                  <FaChevronRight />
                </NavLink>
              </li>
              <li>
                <NavLink to={"/profile"}>
                  <div>
                    <FaRegUser />
                    <h3>Profil</h3>
                  </div>
                  <FaChevronRight />
                </NavLink>
              </li>
            </ul>
            <ul className="links_two">
              <li>
                <NavLink to={"/"}>
                  <div>
                    <MdWhatshot />
                    <h3>Leaderboard </h3>
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
              <div className="circle"></div>

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
            </ul>
            <div className="viewPage">
              <Routes>
                <Route path="/news" element={<News getNewsStatus={getNewsStatus} allNewsStatus={allNewsStatus}  setLoader={setLoader} />} />
                <Route
                  path="/profile"
                  element={<Profile setLoader={setLoader} />}
                />
                <Route
                  path="/leaderboard"
                  element={<LeaderBoard setLoader={setLoader} />}
                />
                <Route
                  path="/auction"
                  element={<Auction setLoader={setLoader} />}
                />
                <Route path="/"
                  element={<Students setLoader={setLoader} />}
                />
                <Route path="newread/:id" element={<NewRead setLoader={setLoader} />} />

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

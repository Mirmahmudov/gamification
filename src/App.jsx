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
import { BsCalendar2Date } from "react-icons/bs";
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

function App() {
  const [isModalOpen, setModalOpen] = useState(getToken() ? false : true);
  const [courses, setCourses] = useState(null);
  const [role, setRole] = useState();
  const [userInfo, setUserInfo] = useState();

  const getCourses = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getToken()}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${baseUrl}/courses/`, requestOptions)
      .then((response) => response.json())
      .then((result) => setCourses(result))
      .catch((error) => console.error(error));
  };

  const userRole = () => {
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
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getCourses();
    userRole();
  }, [getToken()]);

  return (
    <>
      <BrowserRouter>
        <LoginModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
        {role ? <Navbar setModalOpen={setModalOpen} userInfo={userInfo} /> : ""}

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
                <NavLink to={"/attendance"}>
                  <div>
                    <BsCalendar2Date />
                    <h3>Davomat</h3>
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
            <div className="viewPage">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route
                  path="/assessment"
                  element={<Assessment courses={courses} />}
                />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/leaderboard" element={<LeaderBoard />} />
                <Route path="/auction" element={<Auction />} />
                <Route
                  path="/newadded"
                  element={<Newadded courses={courses} />}
                />
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
                    <h3>Student </h3>
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
                    <h3>Student </h3>
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
                {/* <Route path="/" element={<Dashboard />} /> */}
                <Route path="/news" element={<News />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/leaderboard" element={<LeaderBoard />} />
                <Route path="/auction" element={<Auction />} />
                <Route path="/" element={<Student />} />
              </Routes>
            </div>
          </div>
        ) : (
          <div className="error_page">
            <h1>Loading...</h1>
          </div>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import { RiAuctionLine, RiDashboardLine } from "react-icons/ri";
import { FaChevronRight, FaRegUser } from "react-icons/fa";
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
import "./App.css";

function App() {
  const [isModalOpen, setModalOpen] = useState(!getToken());
  const [courses, setCourses] = useState([]);
  const [role, setRole] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [mentorInfo, setMentorInfo] = useState({});
  const [mentorId, setMentorId] = useState(null);

  const fetchData = async (url, method = "GET") => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getToken()}`);
    const requestOptions = { method, headers: myHeaders };
    const response = await fetch(url, requestOptions);
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    return await response.json();
  };

  const getMentor = async () => {
    try {
      const result = await fetchData(`${baseUrl}/mentors/get-me`);
      setMentorInfo(result);
      setMentorId(result.id);
    } catch (error) {
      console.error("Mentorni olishda xatolik:", error);
    }
  };

  const getCourses = async () => {
    if (!mentorId) return;
    try {
      const result = await fetchData(`${baseUrl}/groups/?mentor=${mentorId}`);
      setCourses(result);
    } catch (error) {
      console.error("Kurslarni olishda xatolik:", error);
    }
  };

  const getUserRole = async () => {
    try {
      const result = await fetchData(`${baseUrl}/users/get-me/`);
      setRole(result.role);
      setUserInfo(result);
    } catch (error) {
      console.error("Role aniqlashda xatolik:", error);
    }
  };

  useEffect(() => {
    getUserRole();
    getMentor();
  }, []);

  useEffect(() => {
    getCourses();
  }, [mentorId]);

  return (
    <BrowserRouter>
      <LoginModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
      {role && <Navbar setModalOpen={setModalOpen} userInfo={userInfo} />}
      {role === "mentor" ? (
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
                element={<Assessment courses={courses} userInfo={userInfo} />}
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
          <div className="viewPage">
            <Routes>
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
  );
}

export default App;

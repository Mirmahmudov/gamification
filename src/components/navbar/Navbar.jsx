import React, { useState } from "react";
import "./Navbar.css";
import { FaChevronRight, FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import { MdLogout } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { HiMiniXMark } from "react-icons/hi2";
import { TiInfoLarge } from "react-icons/ti";

function Navbar({ setModalOpen, userInfo }) {
  const navigate = useNavigate();
  const [userModal, setUserModal] = useState(false);

  return (
    <nav>
      <div className="container">
        <div className="pageTitle">
          <div className="logo">
            <img src="/imgs/logo.svg" alt="" />
          </div>
          <h1>Gamification</h1>
        </div>
        <div className="user">
          <div className="name">
            {userInfo.first_name} {userInfo.last_name}
          </div>
          <span
            onClick={() => {
              setUserModal(!userModal);
              console.log(userModal);
            }}
          >
            <FaRegUser />
          </span>
          {/* <button
            className="logOutBtn"
            onClick={() => {
              localStorage.clear();
              navigate("/");
              setModalOpen(true);
            }}
          >
            Log Out
            <MdLogout />
          </button> */}

          <div className={userModal ? "navModal active " : "navModal"}>
            <div
              onClick={() => {
                setUserModal(false);
              }}
              className="exit"
            >
              <HiMiniXMark />
            </div>
            <div className="row">
              <div className="div">
                <span>
                  <FaRegUser />
                </span>
                <h3>shaxsiy ma'lumotlar</h3>
              </div>
              <FaChevronRight />
            </div>

            <div className="row">
              <div className="div">
                <span>
                  <TiInfoLarge />
                </span>
                <h3>ilova haqida </h3>
              </div>
              <FaChevronRight />
            </div>
            <div
              onClick={() => {
                localStorage.clear();
                navigate("/");
                setModalOpen(true);
                setUserModal(false);
              }}
              className="row"
            >
              <div className="div">
                <span>
                  <MdLogout />
                </span>
                <h3>logout</h3>
              </div>
              <FaChevronRight />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

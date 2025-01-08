import React from "react";
import "./Navbar.css";
import { FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import { MdLogout } from "react-icons/md";

function Navbar({ setModalOpen, userInfo }) {
  const navigate = useNavigate();
  return (
    <nav>
      <div className="container">
        <div className="pageTitle">
          <div className="logo">
            <img src="public/imgs/logo.svg" alt="" />
          </div>
          <h1>Dashboard</h1>
        </div>
        <div className="user">
          <div className="name">
            {userInfo.first_name} {userInfo.last_name}
          </div>
          <span>
            <FaRegUser />
          </span>
          <button
            className="logOutBtn"
            onClick={() => {
              localStorage.clear();
              navigate("/");
              setModalOpen(true);
            }}
          >
            Log Out
            <MdLogout />
          </button>
          <button className="logOutIcon"
            onClick={() => {
              localStorage.clear();
              navigate("/");
              setModalOpen(true);
            }}
          >
            <MdLogout />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

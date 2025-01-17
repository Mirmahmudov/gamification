import React, { useState, useRef, useEffect } from "react";
import "./Navbar.css";
import { FaChevronRight, FaRegUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { HiMiniXMark } from "react-icons/hi2";
import { TiInfoLarge } from "react-icons/ti";

function Navbar({ setModalOpen, userInfo }) {
  const navigate = useNavigate();
  const [userModal, setUserModal] = useState(false);
  const modalRef = useRef(null); // Modal uchun reference

  // Modal tashqarisini bosganda yopish funksiyasi
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
              <div className="logo">
                <img src="/imgs/logo.svg" alt="logo" />
              </div>
              <h1>Gamification</h1>
            </div>
            <div className="user">
              <div className="name">
                {userInfo.first_name} {userInfo.last_name}
              </div>
              <span
                onClick={() => setUserModal(!userModal)} // Modalni ochish/yopish
              >
                <FaRegUser />
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

import React, { useState } from "react";
import "./LoginModal.css";
import { setToken } from "../../service/token";
import { baseUrl } from "../../config";

const LoginModal = ({ isOpen, onClose, setLoader }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const getDeviceToken = () => {
    setLoader(true);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      username,
      password,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${baseUrl}/token/`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        
        setLoader(false);

        if (result.access) {
          setToken(result.access);
          onClose();
          setLoader(false);
        }
      })
      .catch((error) => {
        console.error(error);
        setLoader(false);
      });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* <button className="close-btn" onClick={onClose}>
          ×
        </button> */}
        <h2 className="modal-title">Login</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            getDeviceToken();
          }}
          className="login-form"
        >
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              value={username}
              type="text"
              id="username"
              placeholder="Enter your username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              type="password"
              id="password"
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;

import React, { useState } from 'react'
import "./LoginPage.css"
import { MdEmail } from 'react-icons/md';
import { FaEye, FaEyeSlash, FaLock } from 'react-icons/fa';
import { setToken } from '../../service/token';
import { baseUrl } from '../../config';

function LoginPage({ isOpen, onClose, setLoader }) {
    const [emailFocus, setEmailFocus] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

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
        <>
            <div className="user_login_pages">
                <div className="container">
                    <div className="loginPage">
                        <div className="info">
                            <h1>Kirish</h1>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                getDeviceToken();
                            }}>
                                {/* Email */}
                                <div className={`row ${emailFocus ? "focused" : ""}`}>
                                    <label htmlFor="email" className={`placeholder ${emailFocus ? "active" : ""}`}>
                                        login
                                    </label>
                                    {/* <img src="/public/imgs/email.svg" alt="" /> */}
                                    <MdEmail id="input-logo" />
                                    <input
                                        onChange={(e) => {
                                            setUserName(e.target.value);
                                        }}
                                        value={username}
                                        type="text"
                                        id="email"

                                        onFocus={() => setEmailFocus(true)}
                                        onBlur={(e) => setEmailFocus(e.target.value !== "")}
                                    />
                                </div>

                                {/* Password */}
                                <div className={`row ${passwordFocus ? "focused" : ""}`}>
                                    <label htmlFor="password"
                                        className={`placeholder ${passwordFocus ? "active" : ""}`}
                                    >
                                        Password
                                    </label>

                                    <FaLock id="input-logo" />
                                    <input id="password"
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                        value={password}
                                        type={showPassword ? "text" : "password"}
                                        onFocus={() => setPasswordFocus(true)}
                                        onBlur={(e) => setPasswordFocus(e.target.value !== "")}
                                    />

                                    {
                                        <div
                                            onClick={() => setShowPassword(!showPassword)}
                                            style={{ cursor: "pointer" }}
                                            className="eye" id='input-logo' >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </div>
                                    }
                                </div>
                                <button type="submit"  >Login</button>
                            </form>
                        </div>
                        <div className="person_img">
                            <img src="/public/imgs/boy_img.svg" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginPage
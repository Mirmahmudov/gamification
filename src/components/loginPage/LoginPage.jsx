import React from 'react'
import "./LoginPage.css"

function LoginPage() {
    return (
        <>
            <div className="user_login_pages">

                <div className="container">
                    <div className="loginPage">
                        <div className="info">
                            <h1>Kirish</h1>
                            <form action="">
                                <div className='row' action="">
                                    <h5>Email</h5>
                                    <img src="/public/imgs/email.svg" alt="" />
                                    <input type="text" placeholder='email@gmail.com' />
                                </div>
                                <div className='row' action="">
                                    <h5>Password</h5>
                                    <img src="/public/imgs/password.svg" alt="" />
                                    <input type="text" placeholder='Enter your password' />
                                    <img className='eye' src="/public/imgs/eye.svg" alt="" />
                                </div>
                                <button>Login</button>
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
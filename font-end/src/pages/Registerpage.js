import React, { useState } from 'react'

import './HomePage.css';

function RegisterPage() {
    const [username, setUserName] = useState(0);
    const [password, setPassword] = useState(0);
    const [confirm, setConfirm] = useState(0);
    const onUserName = (e) => {
        setUserName(e.target.value);
    };
    const onPassword = (e) => {
        setPassword(e.target.value);
    };
    const onConfirm = (e) => {
        setConfirm(e.target.value);
    };
    const RegisterFunction = () => {
        const axios = require('axios');
        axios.post("http://127.0.0.1:8000/api/register/", {
            username: username,
            password: password,
            confirm: confirm
        })
            .then(function (response) {
                alert("Register success")
                window.location.replace("/");
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <>
            <div class="homepage">
                <header className="header">
                    <nav>
                        <div class="menu-icon">
                            <i class="fa fa-bars fa-2x"></i>
                        </div>
                        <div class="logo">
                            LOGO
                        </div>
                    </nav>
                </header>
                <div className="container" >
                    <div className="d-flex justify-content-center h-100">
                        <div className="card">
                            <div className="card-header">
                                <h3>Sign Up</h3>
                                <div className="d-flex justify-content-end social_icon">
                                    <span><i className="fab fa-facebook-square"></i></span>
                                    <span><i className="fab fa-google-plus-square"></i></span>
                                    <span><i className="fab fa-twitter-square"></i></span>
                                </div>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-user"></i></span>
                                        </div>
                                        <input type="text" className="form-control" placeholder="username" name="username" id="username" onChange={onUserName} />

                                    </div>
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-key"></i></span>
                                        </div>
                                        <input type="password" className="form-control" placeholder="password" name="password" id="password" onChange={onPassword} />
                                    </div>
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-key"></i></span>
                                        </div>
                                        <input type="password" className="form-control" placeholder="confirm" name="confirm" id="confirm" onChange={onConfirm} />
                                    </div>

                                    <div className="form-group">
                                        <button type="button" className="btn float-right login_btn" onClick={RegisterFunction}>Register</button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
                <div>

                </div>
            </div>
            <div class="flooter">
            </div>

        </>
    )
}

export default RegisterPage;

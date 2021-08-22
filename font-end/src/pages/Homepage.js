import '../compoments/css/HomePage.css';


import React from 'react'
import { useState } from 'react'
import { useSessionStorage } from '../compoments/useSessionStorage';
import InPut from '../compoments/Input'

function HomePage() {
    const [username, setUserName] = useState(0);
    const [password, setPassword] = useState(0);
    const [recentLogin, setrecentLogin] = useSessionStorage('recentLogin', false);
    const [id, setId] = useSessionStorage('id', null);

    const onUserName = (e) => {
        setUserName(e.target.value);
    };
    const onPassword = (e) => {
        setPassword(e.target.value);
    };
    const loginFuntion = () => {
        const axios = require('axios');
        axios.post("http://127.0.0.1:8000/api/login/", {
            username: username,
            password: password
        })
            .then(function (response) {
                setrecentLogin(true);
                setId(response.data)
                alert("Login success")
                window.location.replace(`/dashboard/${response.data.id}`);
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
                                <h3>Sign In</h3>
                                <div className="d-flex justify-content-end social_icon">
                                    <span><i className="fab fa-facebook-square"></i></span>
                                    <span><i className="fab fa-google-plus-square"></i></span>
                                    <span><i className="fab fa-twitter-square"></i></span>
                                </div>
                            </div>
                            <div className="card-body">
                                <form>
                                    <InPut
                                        type={'text'}
                                        placeholder={'username'}
                                        function={onUserName}
                                    />
                                    <InPut
                                        type={'password'}
                                        placeholder={'password'}
                                        function={onPassword}
                                    />

                                    <div className="form-group">
                                        <button type="button" className="btn float-right login_btn" onClick={loginFuntion}>Login</button>
                                    </div>
                                </form>
                            </div>
                            <div className="card-footer">
                                <div className="d-flex justify-content-center links">
                                    Don't have an account?<a href="/register">Sign Up</a>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <a href="#">Forgot your password?</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flooter">

            </div>
        </>
    )
}

export default HomePage;
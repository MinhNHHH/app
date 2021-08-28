import React, { useState } from 'react'
import FourmRegister from '../components/Home/FourmRegister';
import HeadHome from '../components/Home/HeadHome';

//import './HomePage.css';

function RegisterPage() {
    const [username, setUserName] = useState(0);
    const [password, setPassword] = useState(0);
    const [confirm, setConfirm] = useState(0);
    const textUserName = (textusername) => {
        setUserName(textusername);
    };
    const textPassword = (textpassword) => {
        setPassword(textpassword);
    };
    const textConfirm = (textconfirm) => {
        setConfirm(textconfirm);
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
                <HeadHome/>
                <FourmRegister
                    onUsername = {textUserName}
                    onPassword = {textPassword}
                    onConfirm = {textConfirm}
                    clickLogin = {RegisterFunction}
                />
                
            </div>
            

        </>
    )
}

export default RegisterPage;

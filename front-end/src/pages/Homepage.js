import './HomePage.css'

import React, { useState } from 'react'
import { useSessionStorage } from '../components/useSessionStorage';

import HeadHome from '../components/Home/HeadHome'
import FormHome from '../components/Home/FormHome'
import axios from "axios";


function HomePage() {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [recentLogin, setrecentLogin] = useSessionStorage('recentLogin', false);
    const [id, setId] = useSessionStorage('id', null);

    const onTextUser = (textuser) => {
        setUserName(textuser);
    };
    const onTextPass = (textpass) => {
        setPassword(textpass);
    };
    const loginFuntion = () => {
        axios.post(process.env.REACT_APP_BASE_API+"/api/login/", {
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
        <div className="homepage">
            <HeadHome />

            <FormHome
                onUsername={onTextUser}
                onPassword={onTextPass}
                clickLogin={loginFuntion}
            />
        </div>
    )
}

export default HomePage;

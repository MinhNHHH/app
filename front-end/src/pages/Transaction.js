import "./TranSaction.css"

import React, { useState } from 'react'

import LayOut from "../components/Layout";
import { getSessionStorageOrDefault } from '../components/useSessionStorage'
import FormTransaction from "../components/Transaction/FormTransaction";

function TranSaction() {
    const data_id = getSessionStorageOrDefault('id', null)
    if (!data_id) {
        window.location.replace('/')
    }
    const [categorize, setFiled] = useState(null)
    const [money, setMoney] = useState(null)

    const textFiled = (textfiled) => {
        setFiled(textfiled)
    };

    const textMoney = (textmoney) => {
        setMoney(textmoney)
    };

    const buyFuntion = () => {
        const axios = require('axios');
        axios.post(`http://127.0.0.1:8000/api/transaction/${data_id.id}/`, {
            categorize: categorize,
            money: money
        })
            .then(function (response) {
                alert("Login success")
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <>

            <LayOut username={data_id.username} title={'TRANSACTION'} id={data_id.id} />
            
            <FormTransaction
                onFiled = {textFiled}
                onMoney = {textMoney}
                clickBuy = {buyFuntion}
            />
        </>
    )
}

export default TranSaction
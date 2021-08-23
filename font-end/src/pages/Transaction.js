import "./TranSaction.css"

import React, { useState } from 'react'

import LayOut from "../components/Layout";


function TranSaction() {
    const data_id = JSON.parse(sessionStorage.getItem('id'))
    const [categorize, setFiled] = useState(null)
    const [money, setMoney] = useState(null)

    const onFiled = (e) => {
        setFiled(e.target.value)
    };

    const onMoney = (e) => {
        setMoney(e.target.value)
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

            <div className="transaction-container">
                <LayOut username={data_id.username} title={'TRANSACTION'} id={data_id.id} />
                <div className="transaction_contain">
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label for="categorizeinput">Categorize</label>
                                <input type="text" className="form-control" id="categorizeinput" placeholder="Categorize" onChange = {onFiled}/>
                            </div>
                            <div className="form-group">
                                <label for="categorizeinput">Money</label>
                                <input type="text" className="form-control" id="moneyinput" placeholder="0" onChange = {onMoney}/>
                            </div>
                            <button type="submit" class="btn btn-primary" onClick = {buyFuntion}> Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TranSaction
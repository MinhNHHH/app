import React, { useState } from 'react'

import Modals from '../Modals'
import FormTransaction from './FormTransaction';

import { Button } from 'react-bootstrap'


export default function TransacItems(props) {
    const [categorize, setFiled] = useState('')
    const [money, setMoney] = useState(0)
    const [modalShowTransac, setModalShowTransac] = useState(false);

    const textFiled = (textfiled) => {
        setFiled(textfiled)
    };

    const textMoney = (textmoney) => {
        setMoney(textmoney)
    };

    const buyFuntion = () => {
        const axios = require('axios');
        axios.post(`http://127.0.0.1:8000/api/transaction/${props.data_id}/`, {
            categorize: categorize,
            money: money
        })
            .then(function (response) {
                alert("Buy success")
                window.location.replace(`/transaction/${props.data_id}`)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    let lists_service = ['Eat','Shopping','Learn','Book']
    const child = <FormTransaction
        clickFiled={textFiled}
        onFiled2={textMoney}
        title1 = "Value"
        title2 = "Note"
        list_service = {lists_service}
    />
    return (
        <div>
            <Button variant="primary" onClick={() => setModalShowTransac(true)}>
                -
            </Button>
            <Modals
                show={modalShowTransac}
                onHide={() => setModalShowTransac(false)}
                child={child}
                title="Transac"
                change={<div className="row">
                    <div className="col-sm-3"></div>
                    <div className="col-sm-9 text-secondary">
                        <button type="button" className="btn btn-primary px-4" onClick={buyFuntion} >Sumbit</button>
                    </div>
                </div>}
            />
        </div>
    )
}

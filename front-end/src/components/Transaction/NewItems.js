import React, { useState } from 'react'

import Modals from '../Modals'
import FormTransaction from './FormTransaction';

import { Button } from 'react-bootstrap'

function NewItems(props) {
    const [income, setIncome] = useState(0)
    const [budget, setBudget] = useState(0)
    const [modelShowAdd, setModalShowAdd] = useState(false);
    const onIncome = (textincome) => {
        setIncome(textincome)
    };

    const onBudget = (textbudget) => {
        setBudget(textbudget)
    };
    const addFuntion = () => {
        const axios = require('axios');
        axios.post(`http://127.0.0.1:8000/api/input/${props.data_id}/`, {
            income: income,
            budget: budget
        })
            .then(function (response) {
                alert("Buy success")
                window.location.replace(`/transaction/${props.data_id}`)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    let list_servicez = ['Income','Investment']
    const child = <FormTransaction
        onFiled1={onIncome}
        onFiled2={onBudget}
        title1 = "Value"
        title2 = "Note"
        list_service = {list_servicez}
    />

    return (
        <div>
            <Button variant="primary" onClick={() => setModalShowAdd(true)}>
                +
            </Button>
            <Modals
                show={modelShowAdd}
                onHide={() => setModalShowAdd(false)}
                child={child}
                title="Add New"
                change={<div className="row">
                    <div className="col-sm-3"></div>
                    <div className="col-sm-9 text-secondary">
                        <button type="button" className="btn btn-primary px-4" onClick={addFuntion} >Sumbit</button>
                    </div>
                </div>}
            />
        </div>
    )
}

export default NewItems
import "./TranSaction.css"

import React from 'react'

import LayOut from "../components/Layout";
import { getSessionStorageOrDefault } from '../components/useSessionStorage'
import NewItems from "../components/Transaction/NewItems";
import TransacItems from "../components/Transaction/TransacItems";


function TranSaction() {
    const data_id = getSessionStorageOrDefault('id', null)
    if (!data_id) {
        window.location.replace('/')
    }
    return (
        <>
            <LayOut username={data_id.username} title={'TRANSACTION'} id={data_id.id} />
            <div className="Addnewitems">
                <TransacItems
                    data_id={data_id.id}
                />
                <NewItems
                    data_id={data_id.id}
                />
            </div>

        </>
    )
}

export default TranSaction
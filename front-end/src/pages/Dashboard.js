import "./DashBoard.css"

import React, { useState, useEffect } from 'react'
import { Line } from "react-chartjs-2";
import { Chart } from "react-google-charts";
import axios from 'axios';

import {getSessionStorageOrDefault} from '../components/useSessionStorage'
import LayOut from '../components/Layout'

function DashBoard() {
    const data_id = getSessionStorageOrDefault('id',null)
    if (!data_id) {
        window.location.replace('/')
    }

    const [data_fromserver, getDataFromServer] = useState(null)
    let data_line = {
        labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],

        datasets: [
            {
                label: "Money Monthly",
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            }
        ]
    };
    let data_pie;
    const getData = async () => {
        try {
            await axios.get(`http://127.0.0.1:8000/api/dashboard/${data_id.id}/`)
                .then((response) => {
                    const dataserver = response.data;
                    getDataFromServer(dataserver)
                }
                )
        }
        catch (error) {
            console.log(error);
        }
    };
    let sums = 0;
    useEffect(() => getData(), []);
    
    if (data_fromserver) {
        for (let i = 0; i < data_line['labels'].length; i++) {
            for (let j = 0; j < data_fromserver.data['income'].length; j++) {
                if (data_line['labels'][i] == data_fromserver.data['income'][j].time_trade__month) {
                    data_line['datasets'][0].data[i] = data_fromserver.data['income'][j].sum
                }
            }
        };
        data_pie = [
            ['Field', 'Money'],
            ['Balance', data_fromserver.data['balance'] + data_fromserver.data['trade']],
        ];
        for (let i = 0; i < data_fromserver.data['money_filed'].length; i++) {
            data_pie = [...data_pie, [data_fromserver.data['money_filed'][i].categorize, -data_fromserver.data['money_filed'][i].sum]]
        }
        sums = data_fromserver.data['history'].reduce((total, cur) => total + cur.money, 0)
    }


    return (
        <>
            <div className="dashcontainer">
                <LayOut username={data_id.username} title={'FINANCE DASHBOARD'} id={data_id.id} />
                <div className='containborder'>
                    <div className="containborder-body">
                        <table className="row_content">
                            <thead className="row_table">
                                <tr>
                                    Wallet
                            </tr>
                            </thead>
                            <tbody className="content_table">
                                {
                                    data_fromserver &&
                                    <tr className="content_table-tr" >
                                        {data_fromserver.balance.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")} VNĐ
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="containborder-body">
                        <table className="row_content">
                            <thead className="row_table">
                                <tr>
                                    Budget
                            </tr>
                            </thead>
                            <tbody className="content_table">
                                {
                                    data_fromserver &&
                                    <tr className="content_table-tr" >
                                        {(data_fromserver.data['budget'] + data_fromserver.data['trade']).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")} VNĐ
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="containborder-body">
                        <table className="row_content">
                            <thead className="row_table">
                                <tr>
                                    Investment
                            </tr>
                            </thead>
                            <tbody className="content_table">
                                <tr className="content_table-tr">
                                    abcdejsf
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="linechart">
                    <p className="title"> Line chart</p>
                    <Line data={data_line}
                        width={'400px'}
                    />
                </div>
                <div className="piechart">
                    <p className="title">Money</p>
                    <Chart
                        height={'300px'}
                        width={'600px'}
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}
                        data={data_pie}
                    />
                </div>
                <div className="table-container">
                    <p className="title">Transaction History</p>
                    <table class="table-scroll small-first-col">
                        <thead>
                            <tr>
                                <th>Field</th>
                                {
                                    data_fromserver &&
                                    <th style={{ textAlign: 'right' }}>Trade: {sums.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")} VNĐ</th>
                                }
                            </tr>
                        </thead>

                        <tbody class="body-half-screen">
                            {
                                data_fromserver &&
                                data_fromserver.data['history'].map((dataz) =>
                                (
                                    <tr class="event_trade">
                                        <td>{dataz.categorize}</td>
                                        <td style={{ textAlign: 'right' }}>{dataz.money.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")} VNĐ</td>
                                    </tr>
                                ))
                            }
                        </tbody>

                    </table>
                </div>
            </div>
        </>
    )
}

export default DashBoard;

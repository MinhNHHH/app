import "./Profile.css"

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap'

import Modals from '../components/Modals'
import LayOut from '../components/Layout'

import {getSessionStorageOrDefault} from '../components/useSessionStorage'

function ProFile() {
    const data_id = getSessionStorageOrDefault('id',null)
    if (!data_id) {
        window.location.replace('/')
    }
    const [modalShow, setModalShow] = useState(false);
    const [datafromserver, getDataFromServer] = useState(null)
    const [fullname, setFullName] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const getData = async () => {
        try {
            await axios.get(`http://127.0.0.1:8000/api/information/${data_id.id}/`)
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
    const onFullNameChange = (e) => {
        setFullName(e.target.value)
    }
    const onAddressChange = (e) => {
        setAddress(e.target.value)
    }
    const onPhoneChange = (e) => {
        setPhone(e.target.value)
    }
    const onEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const UpdateFunction = () => {
        const axios = require('axios');
        axios.put(`http://127.0.0.1:8000/api/information/${data_id.id}/`, {
            fullname: fullname,
            address: address,
            phone: phone,
            email: email,
        })
            .then(function (response) {
                window.location.replace(`/profile/${data_id.id}`)
                console.log(response)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    useEffect(() => getData(), []);

    const child =
        <div className="col-lg-8" style={{ 'position': 'relative', 'right': '165px', 'bottom': '10px' }}>
            <div className="card-2">
                <div className="card-body">
                    <div className="row mb-3">
                        <div className="col-sm-3">
                            <h6 className="mb-0">Full Name</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            <input type="text" className="form-control" onChange={onFullNameChange} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-sm-3">
                            <h6 className="mb-0">Email</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            <input type="text" className="form-control" onChange={onEmailChange} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-sm-3">
                            <h6 className="mb-0">Phone</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            <input type="text" className="form-control" onChange={onPhoneChange} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-sm-3">
                            <h6 className="mb-0">Address</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            <input type="text" className="form-control" onChange={onAddressChange} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    return (
        <>
            <div className="profile">
                <LayOut username={data_id.username} title={'PROFILE'} id={data_id.id} />
                <div className="container-profile main-body row">
                    <div className="col-lg-4">
                        <div className="card-1">
                            <div className="card-body">
                                <div className="d-flex flex-column align-items-center text-center">
                                    <img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="Admin" className="rounded-circle p-1 bg-primary" width="110" />
                                    <div className="mt-3">
                                        <h4>{data_id.username}</h4>
                                        <p className="text-muted font-size-sm">{datafromserver && datafromserver.address}</p>
                                    </div>
                                </div>
                                <hr className="my-4" />
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-globe me-2 icon-inline"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>Website</h6>
                                        <Link
                                            to={{ pathname: "https://www.facebook.com/minh.nh2212/" }}
                                            className="text-secondary">https://facebook.com/minhnh2212</Link>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-github me-2 icon-inline"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>Github</h6>
                                        <Link
                                            to={{ pathname: "https://github.com/hoangminh981" }}
                                            className="text-secondary">https://github.com/hoangminh981</Link>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-facebook me-2 icon-inline text-primary"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>Facebook</h6>
                                        <Link
                                            to={{ pathname: "https://www.facebook.com/minh.nh2212/" }}
                                            className="text-secondary">https://facebook.com/minhnh2212</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="card-2">
                            <div className="card-body">
                                <div className="row mb-3">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Full Name</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        <input type="text" className="form-control" value={datafromserver && datafromserver.fullname} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Email</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        <input type="text" className="form-control" value={datafromserver && datafromserver.email} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Phone</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        <input type="text" className="form-control" value={datafromserver && datafromserver.phone} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Address</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        <input type="text" className="form-control" value={datafromserver && datafromserver.address} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-3"></div>
                                    <div className="col-sm-9 text-secondary">
                                        <Button variant="primary" onClick={() => setModalShow(true)}>
                                            Update
                                                </Button>
                                        <Modals
                                            show={modalShow}
                                            onHide={() => setModalShow(false)}
                                            child={child}
                                            change={<div className="row">
                                                <div className="col-sm-3"></div>
                                                <div className="col-sm-9 text-secondary">
                                                    <button type="button" className="btn btn-primary px-4" onClick={UpdateFunction}>Update</button>
                                                </div>
                                            </div>}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>


        </>
    )
}

export default ProFile
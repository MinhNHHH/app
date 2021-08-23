import React, { useState } from 'react'
import LayOut from '../components/Layout'


function ChangePass() {
    const data_id = JSON.parse(sessionStorage.getItem('id'))
    const [currentpass, setCurrentPass] = useState(null)
    const [newpass, setNewPass] = useState(null)
    const [confirmpass, setConfirmPass] = useState(null)

    const onCurrent = (e) => {
        setCurrentPass(e.target.value)
    }
    const onNewpass = (e) => {
        setNewPass(e.target.value)
    }
    const onConfirm = (e) => {
        setConfirmPass(e.target.value)
    }

    const changepassFunction = () => {
        const axios = require('axios');
        axios.post(`http://127.0.0.1:8000/api/changepass/${data_id.id}/`, {
            currentpass: currentpass,
            newpass: newpass,
            confirmpass: confirmpass
        })
            .then(function (response) {
                alert("Change success")
                window.location.replace(`changepass/${data_id.id}`)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <>
            <div className="changepass">
                <LayOut username={data_id.username} id={data_id.id} title={"CHANGE PASSWORD"} />
                <div className="d-flex justify-content-center h-100">
                    <div className="card">
                        <div className="card-header">
                            <h3>Change Password</h3>
                            <div className="d-flex justify-content-end social_icon">
                                <span><i className="fab fa-facebook-square"></i></span>
                                <span><i className="fab fa-google-plus-square"></i></span>
                                <span><i className="fab fa-twitter-square"></i></span>
                            </div>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-user"></i></span>
                                    </div>
                                    <input type="password" className="form-control" placeholder="currentpassword" name="current" id="current" onChange={onCurrent} />

                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-key"></i></span>
                                    </div>
                                    <input type="password" className="form-control" placeholder="newpassword" name="newpass" id="newpass" onChange={onNewpass} />
                                </div>

                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-key"></i></span>
                                    </div>
                                    <input type="password" className="form-control" placeholder="confirmpassword" name="confirm" id="confirm" onChange={onConfirm} />
                                </div>

                                <div className="form-group">
                                    <button type="button" className="btn float-right login_btn" onClick={changepassFunction}>Change</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChangePass;

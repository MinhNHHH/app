import React from 'react'
import InputChange from './InputChange'
function FormChange(props) {
    const currentPass = (e) => {
        props.onChangeCurPass(e.target.value)
    }
    const newPass = (e) => {
        props.onChangeNewPass(e.target.value)
    }
    const confirmPass = (e) => {
        props.onChangeConfPass(e.target.value)
    }
    const changePass = () => {
        props.clickChangePass()
    }
    return (
        <>
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

                        <InputChange 
                            placeholder = 'Current Password'
                            onChangeFunction = {currentPass}
                        />
                        <InputChange 
                            placeholder = 'New Password'
                            onChangeFunction = {newPass}
                        />
                        <InputChange 
                            placeholder = 'Confirm Password'
                            onChangeFunction = {confirmPass}
                        />
                        <div className="form-group">
                            <button type="button" className="btn float-right login_btn" onClick={changePass}>Change</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default FormChange
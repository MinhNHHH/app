import React from 'react'
import InputHome from './InputHome'

export default function FourmRegister(props) {
    const usernameChange = (e) => {
        props.onUsername(e.target.value)
    }
    const passwordChange = (e) => {
        props.onPassword(e.target.value)
    }
    const confirmChange = (e) => {
        props.onConfirm(e.target.value)
    }
    const registerFuntion = () => {
        props.clickRegister()
    }
    return (
        <>
            <div className="d-flex justify-content-center h-100">
                <div className="card">
                    <div className="card-header">
                        <h3>Sign Up</h3>
                        <div className="d-flex justify-content-end social_icon">
                            <span><i className="fab fa-facebook-square"></i></span>
                            <span><i className="fab fa-google-plus-square"></i></span>
                            <span><i className="fab fa-twitter-square"></i></span>
                        </div>
                    </div>
                    <div className="card-body">
                        <form>
                            <InputHome
                                type={'text'}
                                placeholder={'Username'}
                                function={usernameChange}
                            />
                            <InputHome
                                type={'password'}
                                placeholder={'Password'}
                                function={passwordChange}
                            />
                            <InputHome
                                type={'password'}
                                placeholder={'Confirm'}
                                function={confirmChange}
                            />


                            <div className="form-group">
                                <button type="button" className="btn float-right login_btn" onClick={registerFuntion}>Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

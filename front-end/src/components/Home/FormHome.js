import React from 'react'
import InputHome from './InputHome'


function FormHome(props) {
    const usernameChange = (e) => {
        props.onUsername(e.target.value)
    }
    const passwordChange = (e) => {
        props.onPassword(e.target.value)
    }
    const loginFuntion = () => {
        props.clickLogin()
    }
    return (
        <>
            <div className="d-flex justify-content-center h-100">
                <div className="card">
                    <div className="card-header">
                        <h3>Sign In</h3>
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
                                placeholder={'username'}
                                function={usernameChange}
                            />
                            <InputHome
                                type={'password'}
                                placeholder={'password'}
                                function={passwordChange}
                            />

                            <div className="form-group">
                                <button type="button" className="btn float-right login_btn" onClick={loginFuntion}>Login</button>
                            </div>
                        </form>
                    </div>
                    <div className="card-footer">
                        <div className="d-flex justify-content-center links">
                            Don't have an account?<a href="/register">Sign Up</a>
                        </div>
                        <div className="d-flex justify-content-center">
                            <a href="#">Forgot your password?</a>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default FormHome

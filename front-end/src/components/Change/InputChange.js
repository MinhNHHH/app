import React from 'react'

function InputChange(props) {
    return (
        <>
            <div className="input-group form-group">
                <div className="input-group-prepend">
                    <span className="input-group-text"><i className="fas fa-user"></i></span>
                </div>
                <input type= 'password' className="form-control" placeholder = {props.placeholder} onChange={props.onChangeFunction} />
            </div>
        </>
    )
}

export default InputChange

import React from 'react'

export default function InputHome(props) {
    return (
        <>
          <div className="input-group form-group">
                <div className="input-group-prepend">
                    <span className="input-group-text"><i className="fas fa-key"></i></span>
                </div>
                <input type={props.type} className="form-control" placeholder= {props.placeholder} onChange={props.function} />
            </div>  
        </>
    )
}

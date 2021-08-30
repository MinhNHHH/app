import React from 'react'

export default function FormTransaction(props) {
    
    const fillFiled1 = (e) => {
        props.onFiled1(e.target.value)
    }
    const fillFiled2 = (e) => {
        props.onFiled2(e.target.value)
    }
    return (
        <div className="transaction_contain">
            <div className="card-body">
                <form>
                    <div className="form-group">
                        <label for="categorizeinput">{props.title1}</label>
                        <input type="text" className="form-control" id="categorizeinput" onChange={fillFiled1} />
                    </div>
                    <div className="form-group">
                        <label for="categorizeinput">{props.title2}</label>
                        <input type="number" className="form-control" id="moneyinput"  onChange={fillFiled2} />
                    </div>
                </form>
            </div>
        </div>
    )
}

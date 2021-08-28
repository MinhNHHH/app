import React from 'react'

export default function FormTransaction(props) {
    
    const fillFiled = (e) => {
        props.onFiled(e.target.value)
    }
    const fillMoney = (e) => {
        props.onMoney(e.target.value)
    }
    const buyFuntion = () => {
        props.clickBuy()
    }
    return (
        <div className="transaction_contain">
            <div className="card-body">
                <form>
                    <div className="form-group">
                        <label for="categorizeinput">Categorize</label>
                        <input type="text" className="form-control" id="categorizeinput" placeholder="Categorize" onChange={fillFiled} />
                    </div>
                    <div className="form-group">
                        <label for="categorizeinput">Money</label>
                        <input type="number" className="form-control" id="moneyinput" placeholder = "0" onChange={fillMoney} />
                    </div>
                    <button type="submit" class="btn btn-primary" onClick={buyFuntion}> Submit</button>
                </form>
            </div>
        </div>
    )
}

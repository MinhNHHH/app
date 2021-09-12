import React, {useState} from 'react'

export default function FormTransaction(props) 
{
    const [id,setId] = useState("")
    const [isclick,setIsClick] = useState(false)
    const [iscliked, setIsClicked] = useState(true)

    const fillFiled1 = (e) => {
        props.onFiled1(e.target.value)
    }
    const fillFiled2 = (e) => {
        props.onFiled2(e.target.value)
    }
    const beforclick = (e) => {
        setIsClick(true)
        props.clickFiled(e.target.textContent)
        document.getElementById(e.target.id).style.color = 'red'
    }
    const afterclick = (e) => {
        setIsClick(false)
        document.getElementById(e.target.id).style.color = 'black'
    }
    


    return (
        <div className="transaction_contain">
            <div className="transaction_contain-input">
                <label for="categorizeinput">{props.title2}</label>
                <input type="text" className="form-control" id="categorizeinput" onChange={fillFiled1} />
            </div>
            <div className="transaction_contain-input">
                <label for="categorizeinput">{props.title1}</label>
                <input type="number" className="form-control" id="categorizeinput" style={{ 'width': '90%' }} onChange={fillFiled2} />
            </div>
            <div className="trainsaction_contain-option">
                <p> List </p>
                <div className="trainsaction_contain-option-border">

                    {
                        props.list_service.map((service) => (
                            <div className={"trainsaction_contain-option-sqaure"} id = {service} onClick = {!isclick ? beforclick : afterclick} >{service}</div>
                        ))
                    }

                </div>
            </div>
        </div>
    )
}

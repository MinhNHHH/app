import React, { useState } from 'react'
import { BrowserRouter as Redirect } from 'react-router-dom';

import LayOut from '../components/Layout'
import { getSessionStorageOrDefault } from '../components/useSessionStorage'
import FormChange from '../components/Change/FormChange'

function ChangePass() {
    const data_id = getSessionStorageOrDefault('id', null)
    if (!data_id) {
        window.location.replace('/')
    }
    const [currentpass, setCurrentPass] = useState('')
    const [newpass, setNewPass] = useState('')
    const [confirmpass, setConfirmPass] = useState('')

    const onCurrent = (textcurpass) => {
        setCurrentPass(textcurpass)
    }
    const onNewpass = (textnewpass) => {
        setNewPass(textnewpass)
    }
    const onConfirm = (textconfirm) => {
        setConfirmPass(textconfirm)
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
                <LayOut username={data_id && data_id.username} id={data_id && data_id.id} title={"CHANGE PASSWORD"} />
                <FormChange
                    onChangeCurPass={onCurrent}
                    onChangeNewPass={onNewpass}
                    onChangeConfPass={onConfirm}
                    clickChangePass={changepassFunction}
                />
            </div>
        </>
    )
}

export default ChangePass;

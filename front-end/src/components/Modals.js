import React from 'react'
import { Modal, Button } from 'react-bootstrap'

export default function Modals(props) {
    return (
        <>
            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {props.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.child}
                </Modal.Body>
                <Modal.Footer>
                    {props.change}
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
            
        </>
    )
}

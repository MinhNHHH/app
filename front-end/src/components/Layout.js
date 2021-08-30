import React from 'react'
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./Layout.css"


function LayOut({ username, title, id }) {

    return (
        <>
            <div className="header1">
                <div className="menu-icon">
                    <i className="fa fa-bars fa-2x"></i>
                </div>
                <div className="logo">
                    LOGO
                    </div>
                <div className="document">
                    <div className="catalog">
                        <Link
                            to={{
                                pathname: `/dashboard/${id}`,
                            }}
                            style={{ textDecoration: 'none', color: 'white' }}
                        >Dashboard</Link>
                    </div>
                    <div className="catalog">
                        <Link
                            to={{
                                pathname: `/transaction/${id}`,
                            }}
                            style={{ textDecoration: 'none', color: 'white' }}
                        >Transaction</Link>
                    </div>
                    <div className="catalog">
                        <Link
                            to={{
                                pathname: `/dashboard/${id}`,
                            }}
                            style={{ textDecoration: 'none', color: 'white' }}
                        >Report</Link>
                    </div>

                </div>
            </div>

            <div className='tuto'>
                <p className='title1'>
                    {title}
                </p>
                <div className="dropdown">
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {username}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href={`/profile/${id}`}>Profile</Dropdown.Item>
                            <Dropdown.Item href={`/changepassword/${id}`}>Change Password</Dropdown.Item>
                            <Dropdown.Item href={"/"} onClick={() => { sessionStorage.clear() }}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        </>

    )
}

export default LayOut
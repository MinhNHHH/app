import React from 'react'
import { Link } from 'react-router-dom';
export default function HeadHome() {
    return (
        <>
            <header className="header">
                <nav>
                    <div class="menu-icon">
                        <i class="fa fa-bars fa-2x"></i>
                    </div>
                    <div class="logo">
                        <Link to  = {{pathname : '/'}} style = {{color : 'white', textDecoration : 'none'}} >LOGO </Link>
                        </div>
                </nav>
            </header>
        </>
    )
}

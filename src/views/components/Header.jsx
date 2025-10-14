import React from 'react';
import { Link } from "react-router-dom";

function Header() {

    return (
        <>

        <header>
            <Link to="/lucid-frontend/">
                <h1>SSR Editor</h1>
            </Link>
            <div className="logout" >
            <Link to="/lucid-frontend/logout">
                <h3>Logout</h3>
            </Link>
            </div>
        </header>

        </>
    );
}

export default Header

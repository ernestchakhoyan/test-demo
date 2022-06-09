import React from "react";
import logo from '../../logo.svg';
import '../../App.css';
import { Link } from "react-router-dom";


export function Layout({children}) {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
            </header>
            <div className="nav-wrapper">
                <nav className="navigation">
                    <Link to="/">Counter</Link>
                    <Link to="/user">User</Link>
                    <Link to="/repo">Repo</Link>
                </nav>
            </div>
            <div className="content">
                {children}
            </div>
        </div>
    );
}

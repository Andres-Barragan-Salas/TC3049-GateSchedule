import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { signUserOut } from '../calls/auth';

import './Header.css';

const Header = () => {
    const { username } = useSelector(state => state.user);
    const [optionsOpen, setOptionsOpen] = useState(false);
    const ref = useRef(null);
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (optionsOpen) {
            const handleClickOutside = (e) => {
                if (ref.current && !ref.current.contains(e.target)) {
                    setOptionsOpen(false);
                }
            }

            document.addEventListener('click', handleClickOutside);
            return () => document.removeEventListener('click', handleClickOutside);
        }
    }, [ref, optionsOpen]);

    const logout = async () => {
        await signUserOut();
        navigate('/');
    };

    return (
        <header className="cinema-tec-header">
            <div className="safe-area">
                <div className="header-container">
                    <div className="header-left">
                        <h1 className="title"><i className="bx bxs-plane"/> AIFA Gate Schedule</h1>
                        <Link to="/" className={pathname === '/' ? 'active' : ''}>Gates</Link>
                        {/* <Link to="/reservations" className={pathname === '/reservations' ? 'active' : ''}>My reservations</Link> */}
                    </div>
                    <div className="header-right">
                        <h2>Welcome <span>{username}</span>!</h2>
                        <div className="options-container">
                            <button className="user-button" onClick={() => setOptionsOpen(!optionsOpen)}><i className="bx bxs-user-circle"/></button>
                            <button ref={ref} className={`logout-button ${optionsOpen ? 'active' : ''}`} disabled={!optionsOpen} onClick={logout}>Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
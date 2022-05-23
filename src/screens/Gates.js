import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import LoadingSpinner from '../components/LoadingSpinner';

import './Gates.css';

const Gates = () => {
    return (
        <div className="gates-screen">
            <div className="safe-area">
                <h1>Available <span>Gates</span></h1>
                <div className="gates-container">
                </div>
            </div>
        </div>
    );
};

export default Gates;
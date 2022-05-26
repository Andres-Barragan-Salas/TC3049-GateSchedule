import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { detachListeners, attachListeners } from '../calls/listen';
import { listenGatesInformation } from '../calls/gates';
import LoadingSpinner from '../components/LoadingSpinner';

import './Gates.css';

const Gates = () => {
    const [gates, setGates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
		try {
			const unsubFuncs = attachListeners([
				() => listenGatesInformation(setGates, setLoading)
			]);

			return () => detachListeners(unsubFuncs);
		} catch (err) {
			console.error(err);
		}
    }, []);

    const renderGates = () => {
        return gates.map((gate) => {
            const { gate_number, gate_reservations, gate_type } = gate;

            return  (
                <div className="gate-display">
                    <div className="gate-top">
                        <h3>Gate {gate_number} | <span>{gate_type.toUpperCase()}</span></h3>
                        <button>Reserve</button>
                    </div>
                    <div className="reservation-container">
                        {gate_reservations.length === 0
                            ?   <p className="empty-reservations">No reservations found</p>
                            :   <div></div>
                        }
                    </div>
                </div>
            );
        })
    };

    return (
        <div className="gates-screen">
            <div className="safe-area">
                <h1>Available <span>Gates</span></h1>
                <div className="gates-container">
                    {renderGates()}
                </div>
            </div>
        </div>
    );
};

export default Gates;
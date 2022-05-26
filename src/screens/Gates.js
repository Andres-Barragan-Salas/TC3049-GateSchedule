import React, { useState, useEffect } from 'react';

import { detachListeners, attachListeners } from '../calls/listen';
import { listenGatesInformation } from '../calls/gates';
import LoadingSpinner from '../components/LoadingSpinner';
import GateCell from '../components/GateCell';

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
            return <GateCell gate={gate} key={gate.id} />;
        })
    };

    return (
        <div className="gates-screen">
            <div className="safe-area">
                <h1>Available <span>Gates</span></h1>
                {loading
                    ?   <LoadingSpinner centered />
                    :   <div className="gates-container">
                            {renderGates()}
                        </div>
                }
            </div>
        </div>
    );
};

export default Gates;
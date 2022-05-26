import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { getDateValues, getDateMXFormat } from '../util/validators';
import { updateGateDoc } from '../calls/gates';
import Modal from './Modal';

import './GateCell.css';

const GateCell = ({ gate }) => {
    const { gate_number, gate_reservations, gate_type } = gate;
    const { minDate, maxDate } = getDateValues(2);

    const { id, username, email } = useSelector(state => state.user);
    const [reservationCreationOpen, setReservationCreationOpen] = useState();
    const [reservationForm, setReservationForm] = useState({ airline: '', reservation_date: minDate, reservation_time: '00:00' });
    const [loadingReservation, setLoadingReservation] = useState(false);
    const [error, setError] = useState(null);

    const { airline, reservation_date, reservation_time } = reservationForm;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReservationForm({ ...reservationForm, [name]: value });
    };

    const handleDateChange = (e) => {
        const value = e.target.value;
        setReservationForm({ ...reservationForm, reservation_date: value });
    };

    const handleTimeChange = (e) => {
        const value = e.target.value;
        setReservationForm({ ...reservationForm, reservation_time: value });
    };

    const validFields = () => {
        const setValidationError = (errorMessage) => {
            setError(errorMessage);
            return false;
        };

        setError(null);
        if (!airline) return setValidationError('Please provide the name of the airline making the reservation request');
        if (!reservation_date) return setValidationError('Please provide the date for the reservation');
        if (!reservation_time) return setValidationError('Please provide the time for the reservation');
        return true;
    };

    const createReservation = async () => {
        if (!validFields()) return;

        setLoadingReservation(true);
        try {
            const params = { 
                ...reservationForm, 
                reservation_date: getDateMXFormat(reservation_date), 
                user: { id, username, email } 
            };
            await updateGateDoc(gate.id, params);
            setReservationForm({ airline: '', reservation_date: minDate, reservation_time: '00:00' });
            setReservationCreationOpen(false);
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
        setLoadingReservation(false);
    }

    const renderReservations = () => {
        return gate_reservations.map((reservation) => {
            const { airline, reservation_date, reservation_time, status } = reservation;

            return (
                <div className="reservation-cell">
                    <p className="field">{airline}</p>
                    <p className="field">{reservation_date}</p>
                    <p className="field">{reservation_time}</p>
                    <p className="status">{status}</p>
                </div>
            );
        });
    }

    return  (
        <div className="gate-cell">
            <div className="cell-top">
                <h3>
                    Gate {gate_number} | 
                    <span>
                        {gate_type.toUpperCase()}
                        <i className={`bx bxs-plane-${gate_type === 'Boarding' ? 'take-off' : 'land'}`} />
                    </span>
                </h3>
                <button onClick={() => setReservationCreationOpen(true)}>Book</button>
            </div>
            <div className="reservation-container">
                {gate_reservations.length === 0
                    ?   <p className="empty-reservations">No reservations found</p>
                    :   renderReservations()
                }
            </div>
            <Modal active={reservationCreationOpen} onDismiss={() => setReservationCreationOpen(false)}>
                <div className="reservation-creation" onClick={(e) => e.stopPropagation()}>
                    <h1>Gate {gate_number} reservation</h1>
                    <div className="reservation-creation-input">
                        <i className="bx bxs-plane-alt" />
                        <input name="airline" type="text" placeholder="Airline name" value={airline} onChange={handleInputChange} />
                    </div>
                    <div className="reservation-creation-input">
                        <i className="bx bx-calendar" />
                        <input type="date" value={reservation_date} min={minDate} max={maxDate} required onChange={handleDateChange} />
                    </div>
                    <div className="reservation-creation-input">
                        <i className="bx bx-time" />
                        <input type="time" value={reservation_time} required onChange={handleTimeChange} />
                    </div>
                    <div className="options-container">
                        <p className="error-message">{error ?? ' '}</p>
                        <button onClick={createReservation}>{loadingReservation ? 'Loading...' : 'Book'}</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default GateCell;
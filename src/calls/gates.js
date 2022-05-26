import { doc, onSnapshot, collection, query, orderBy, runTransaction } from 'firebase/firestore';

import { db } from '../firebase-config';
import { formatGates, formatGate } from './fmt';

export const listenGatesInformation = (setGates, setLoading) => {
    const unsub = onSnapshot(query(
        collection(db, 'gates'),
        orderBy('gate_number', 'asc')
    ), (querySnap) => {
        const gateDocs = formatGates(querySnap.docs);
        setGates(gateDocs);
        setLoading(false);
    }, (err) => {
        console.error(err);
    });

    return unsub;
}

export const updateGateDoc = async (id, data) => {
    const currentDate = new Date();
    const reservationInfo = {
        ...data,
        created_at: currentDate.toISOString(),
        status: 'PENDING'
    };

    await runTransaction(db, async (transaction) => {
        const gateDocRef = doc(db, 'gates', id);

        const gateDoc = await transaction.get(gateDocRef);
        const gateInfo = formatGate(gateDoc);
        
        const params = {
            gate_reservations: [
                ...gateInfo.gate_reservations,
                reservationInfo
            ]
        };

        transaction.update(gateDocRef, params);
    });
}
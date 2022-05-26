import { onSnapshot, collection, query, orderBy } from 'firebase/firestore';

import { db } from '../firebase-config';
import { formatGates } from './fmt';

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
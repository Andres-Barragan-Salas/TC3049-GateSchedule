export const formatGates = (gateDocs) => {
    return gateDocs.map(doc => formatGate(doc));
}

export const formatGate = (gateDoc) => {
    const gateData = gateDoc.data({ serverTimestamps: 'estimate' });

    return {
        ...gateData,
    }
}
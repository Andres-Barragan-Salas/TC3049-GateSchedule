export const detachListeners = (unsubFuncs) => {
    for (const unsub of unsubFuncs) {
        try {
            if (typeof unsub === 'function') {
                unsub();
            }
        } catch (err) {
            console.error(err);
        }
    }
}

export const attachListeners = (apiListenerFuncs) => {
    try {
        const unsubFuncs = apiListenerFuncs.map(func => func());
        return unsubFuncs;
    } catch (err) {
        console.error(err);
    }
}

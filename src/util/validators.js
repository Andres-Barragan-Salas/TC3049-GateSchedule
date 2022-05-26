export const validateEmail = (email) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
};

export const getDateValues = (spanWeeks) => {
    const dateValues = {};
    const date = new Date();
    dateValues.currentDate = date.toISOString().split('T')[0];
    date.setDate(date.getDate() + 1);
    dateValues.minDate = date.toISOString().split('T')[0];
    date.setDate(date.getDate() + (spanWeeks * 7 - 1));
    dateValues.maxDate = date.toISOString().split('T')[0];
    return dateValues;
}

export const getDateMXFormat = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return [day, month, year].join('/');
}
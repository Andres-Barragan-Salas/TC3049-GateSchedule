import { createSlice } from '@reduxjs/toolkit';

export const gatesSlice = createSlice({
    name: 'gates',
    initialState: [],
    reducers: {
        setGates: (_state, { payload }) => {
            return payload;
        }
    }
});

export default gatesSlice.reducer;
export const { setGates } = gatesSlice.actions;
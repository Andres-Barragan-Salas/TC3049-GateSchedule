import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        id: null,
        username: null,
        email: null,
        loading: true
    },
    reducers: {
        setUser: (_state, { payload }) => {
            return { ...payload };
        },
        resetUser: () => {
            return { id: null, username: null, email: null, loading: false };
        }
    }
});

export default userSlice.reducer;
export const { setUser, resetUser } = userSlice.actions;

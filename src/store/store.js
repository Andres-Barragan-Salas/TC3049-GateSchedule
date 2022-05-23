import { configureStore } from '@reduxjs/toolkit';

import gatesReducer from './slices/gatesSlice';
import userReducer from './slices/userSlice';

export default configureStore({
    reducer: {
        gates: gatesReducer,
        user: userReducer
    }
});
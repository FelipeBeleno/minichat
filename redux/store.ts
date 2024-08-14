
import { configureStore } from '@reduxjs/toolkit';
import loaderReducer from './slices/laoderSlice'

export const store = configureStore({
    reducer: {
        loader: loaderReducer,
    },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

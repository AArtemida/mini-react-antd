import { configureStore } from '@reduxjs/toolkit'
import menuReducer  from "./reducers/menu";

const store = configureStore({
  reducer: {
    menu: menuReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type Store = ReturnType<typeof store.getState>

export default store;
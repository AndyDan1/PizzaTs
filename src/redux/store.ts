import { configureStore } from '@reduxjs/toolkit'
import filterReducer from "./slice/filterSlice";
import cartReducer from "./slice/cartSlice";
import pizzasReducer from "./slice/pizzasSlice";
import {useDispatch} from "react-redux";

export const store = configureStore({
  reducer: {
    filters:filterReducer,
    cart:cartReducer,
    pizzas:pizzasReducer
  },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
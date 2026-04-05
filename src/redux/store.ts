import { configureStore } from '@reduxjs/toolkit'
import userSlice from "./userSlise"
import cartSlice from "./cartSlise"

export const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice
  },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
import { configureStore } from '@reduxjs/toolkit'
import userSlice from "./userSlise"

export const store = configureStore({
  reducer: {
    user: userSlice
  },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
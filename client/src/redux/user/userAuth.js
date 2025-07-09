import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn: false,
    user: null,
}

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
        const payload = action.payload
        state.isLoggedIn = true
        state.user = payload
    },
    removeUser: (state) => {
        state.isLoggedIn = false
        state.user = null
    },
  },
})

export const { setUser, removeUser } = UserSlice.actions

export default UserSlice.reducer

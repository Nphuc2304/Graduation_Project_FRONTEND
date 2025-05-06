import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface User {
  id: string
  fullName: string
  credit: number
  isKYC: boolean
  email: string
  username: string
  avatarImg: string
  dateOfBirth: string | null
  phoneNum: string
  address: string
}

export interface UserState {
  user: User | null
}

const initialState: UserState = {
  user: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload
    },
    clearUser(state) {
      state.user = null
    },
  },
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer

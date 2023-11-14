
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
      credentials: {}
    },
    reducers: {
      login: (state, action) => {
       state.token = action.payload
      },
      logout: (state, action) => {
        state.token = null
      }
      
    }
    
}); 

export const selectToken = (state) => state.user.token;
export const { login, logout } = userSlice.actions;
export const userData = (state) => state.user;
export default userSlice.reducer;
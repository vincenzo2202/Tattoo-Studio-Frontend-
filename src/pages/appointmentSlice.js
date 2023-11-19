import { createSlice } from '@reduxjs/toolkit';

export const appointmentSlice = createSlice({
    name: 'appointment',
    initialState: {
      credentials: {}
    },
    reducers: {
        idToUpdate: (state, action) => {
       state.idToUpdate = action.payload
      }  
    }
}); 
 
export const selectIdToUpdate = (state) => state.appointment.idToUpdate;  
export const {  idToUpdate } = appointmentSlice.actions;
export default appointmentSlice.reducer;
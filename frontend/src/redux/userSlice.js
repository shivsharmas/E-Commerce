import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    image : "",
    id : "",
}

export const userSlice = createSlice({
    name : "user",
    initialState,
    reducers : {
        loginRedux : (state, action)=>{
            console.log(action.payload.data);
            state.id = action.payload.data.id;
            state.firstName = action.payload.data.firstName;
            state.lastName = action.payload.data.lastName;
            state.email = action.payload.data.email;
            state.image = action.payload.data.image;
        },

        logoutRedux : (state, action)=>{
            // console.log(action.payload.data);
            state._id = "";
            state.firstName = "";
            state.lastName = "";
            state.email = "";
            state.image = "";
        },



    }
})

export const { loginRedux, logoutRedux } = userSlice.actions

export default userSlice.reducer
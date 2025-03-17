import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    signinEmail:"",
    userId:"",
    isNewUser:false,
    keepMeSignedIn:false,
    hasSubscription:false,
}

export const signInState = createSlice({
    name:"signInState",
    initialState,
    reducers: {
        setSigninEmail: (state, action) => {
            state.signinEmail = action.payload;
        },
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
        setIsNewUser: (state, action) => {
            state.isNewUser = action.payload;
        },
        setkeepMeSignedIn: (state, action) => {
            state.keepMeSignedIn = action.payload;
        },
        setHasSubscription: (state,action)=>{
            state.hasSubscription = action.payload
        }
    }
})

export const {setSigninEmail,setUserId,setIsNewUser,setkeepMeSignedIn,setHasSubscription} = signInState.actions;

export default signInState.reducer
import {createSlice} from '@reduxjs/toolkit'
const userSlice=createSlice({
    name:"user",
    initialState:{
    user: window.localStorage.getItem("userInfo")
    ? window.localStorage.getItem("userInfo")
    : null
    },
    reducers:{
        update:(state,action)=>{
    state.user=action.payload
    console.log(state.user)
        },
    
    remove:(state)=>{state.user=null
    window.localStorage.removeItem("userInfo")}
},
})

export const{update,remove}=userSlice.actions

export default userSlice.reducer;
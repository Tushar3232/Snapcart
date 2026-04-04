import { IUser } from "@/app/models/user.model";
import { createSlice } from "@reduxjs/toolkit";


interface IUserSlice{
    userData: IUser | null,
    
}

const initialState: IUserSlice={
    userData:null,
   

}
const userSlise= createSlice({
    name:"user",
    initialState,
    reducers:{
        setUserData:(state, action)=>{
            state.userData=action.payload
        }
    }

})

export const {setUserData}=userSlise.actions
export default userSlise.reducer
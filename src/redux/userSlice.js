import { createSlice } from "@reduxjs/toolkit";



const initialState={
    id_usu:"1",
    nombre:"Prueba",
    rol:"A",
};


export const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        addUser:(state,action)=>{
            const[id_usu,nombre,rol]=action.payload;
            state.id_usu=id_usu;
            state.nombre=nombre;
            state.rol=rol;
        
        },

        addNom:(state,action)=>{
            state.nombre=action.payload;

        },
        addId:(state,action)=>{
            state.id_usu=action.payload;
                console.log(action.payload)
        },
        addNivel:(state,action)=>{
            state.rol=action.payload;
        },
        showName:(state)=>{
            return state.nombre;
        },


    

    }
})
export const{addUser,addId,addNom,addNivel,showName} = userSlice.actions;
export const selectUsua =(state)=>state.user.name;
export default userSlice.reducer;

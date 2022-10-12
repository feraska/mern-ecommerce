import React, {createContext, useState, useEffect} from 'react'
import ProductsAPI from './api/ProductsAPI'
import UserAPI from './api/UserAPI'
import CategoriesAPI from './api/CategoriesAPI'
import io from 'socket.io-client'
import axios from 'axios'

export const GlobalState = createContext()


export const DataProvider = ({children}) =>{
   
     const [token, setToken] = useState("")
     const [socket,setSocket] = useState(null) 
     const refreshToken = async () =>{
        const res = await axios.get('/user/refresh_token')

       setToken(res.data.accesstoken)
     //  console.log("token",res.data)
       // setTimeout(() => {
       //     refreshToken()
       // }, 10 * 60 * 1000)
   }
    // const refreshToken = async () =>{
    //     const res = await axios.get('/user/refresh_token')
    //     setToken(res.data.accesstoken)
    

     useEffect(() =>{
         const firstLogin = localStorage.getItem('firstLogin')
         if(firstLogin){
             
             refreshToken()
             const socket = io()
            setSocket(socket)
         }
         
         return()=>socket.close()
     },[])


    
    const state = {
         token: [token, setToken],
         socket:[socket,setSocket],
         productsAPI: ProductsAPI(),
         userAPI: UserAPI(token),
        categoriesAPI: CategoriesAPI()
        
    }

    return (
        <GlobalState.Provider value={state}>
           
            {children}
        </GlobalState.Provider>
    )
}

import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { GlobalState } from '../../../GlobalState'
import  './userData.css'
const UserData = () => {
 
    const {t} = useTranslation()
    const state = useContext(GlobalState)
    const [token] = state.token
    const [onEditEmail,setOnEditEmail] = useState(false)
    const [onEditName,setOnEditName] = useState(false)
    const[name,setName] = useState(state.userAPI.name)
    const [email,setEmail] = useState(state.userAPI.email)
    const [callback,setCallback] = state.userAPI.callback
    const emailHandler = async(e) =>{
      try{
      e.preventDefault()
      if(onEditEmail){
      const res = await axios.patch('/user/update/email',{email:email},{
        headers:{Authorization:token}
      })
      

      alert(res.data.msg)
      setCallback(!callback)
    }
    setOnEditEmail(true)
      }
      catch(err){
        alert(err.response.data.msg)
      }
      
    }
  
    const nameHandler = async(e)=>{
      try{
      e.preventDefault()
      if(onEditName){
      const res = await axios.patch('/user/update/name',{name:name},{
        headers:{Authorization:token}
      })
      
      alert(res.data.msg)
      setCallback(!callback)
    }
    setOnEditName(true)
  }
  catch(err){
    alert(err.response.data.msg)
  }
    }
   // console.log("id",id)
  return (
    <div className="user-data">
        <div className='email'>
        <label htmlFor="email">{t('email')}</label>
        <input type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <button onClick={emailHandler}>{onEditEmail?('update'):('edit')}</button>
        {onEditEmail?<button onClick={()=>setOnEditEmail(false)}>{"cancel"}</button>:''}
        </div>
        <div className='name'>
        
        <label htmlFor="name">{t('name')}</label>
        <input type="text" name="name" value={name} onChange={(e)=>setName(e.target.value)}  />
        <button onClick={nameHandler}>{onEditName?('update'):('edit')}</button>
        {onEditName?<button onClick={()=>setOnEditName(false)}>{"cancel"}</button>:''}
        </div>
       
    
    </div>
  )
}

export default UserData

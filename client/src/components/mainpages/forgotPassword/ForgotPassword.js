import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import './forgotPassword.css'
import Loading from '../utils/loading/Loading'
const ForgotPassword = () => {
    const [email,setEmail] = useState('')
    const [ID,setId] = useState('')
    const [password,setPassword] = useState('')
    const [rePassowrd,setRepassword] = useState('')
    const [codeEnc,setCodeEnc] = useState('')
    const [codeDec,setCodeDec] = useState('')
    const [success,setSuccess] = useState(false)
    const [key,setKey] = useState(false)
    const {t} = useTranslation()
    const [loading,setLoading] = useState(false)
    const content=()=>{
      if(success){
        return(
          <div className='change-password'>
          <div className='password'>
          <label htmlFor="email">{t('password')}</label>
          <input type="password" name="password" value={password}  onChange={(e)=>setPassword(e.target.value)}  />
          </div>
         
          </div>
        )
      }
      else
      if(ID){
        return(
          <div className='code'>
          <label htmlFor="code">code</label>
          <input type="text" name="code" value={codeDec} onChange={(e)=>setCodeDec(e.target.value)}  />
          </div>
          
        )
      }
      else{
        return(
        <div className='email'>
        <label htmlFor="email">{t('email')}</label>
        <input type="email" name="email"value={email}  onChange={(e)=>setEmail(e.target.value)}  />
        </div>
        )
      }

       
    }
    const clickHandler = async()=>{
      try{
        if(success){
          setLoading(true)
          const res = await axios.patch(`/user/updatePassword`,{_id:ID,password})
          setLoading(false)
          alert(res.data.msg)

         }
         else
         if(ID){
          setLoading(true)
          await axios.get(`/user/validcode?codeEnc=${codeEnc}&codeDec=${codeDec}`)
          setLoading(false)
          // await axios.post(`/user/sendEmail?codeEnc=${codeEnc}&codeDec=${codeDec}`,{email})
           setSuccess(true)
        }
        
        else{
          setLoading(true)
          const data = await axios.get(`/user/getid?email=${email}`)
          setLoading(false)
          // console.log(data.data)
          setId(data.data._id)
          setCodeEnc(data.data.code)
        }
      }
      catch(err){
        alert(err.response.data.msg)
      }
      
    }
  
   
  return (
    
   
    <div className="user-data">
      {
        loading?<Loading/>:content()
        
      }
      <button onClick={clickHandler}>{t('send')}</button>
    
    </div>
  
    

  )
}

export default ForgotPassword

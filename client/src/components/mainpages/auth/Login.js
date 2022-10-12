import React, { useEffect, useState,useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'
import success from '../../headers/icon/success.gif'
import { io } from 'socket.io-client'
const Login = () => {
  const {t} = useTranslation()
  const state = useContext(GlobalState)
  const [token,setToken] = state.token
  const [socket,setSocket] = state.socket
  const [showMsg,setShowmsg] = useState("")
  const [showImage,setShowImage] = useState(false)
  //const [callback,setCallback] = state.userAPI.callback
  const navigate = useNavigate()
 // const [firstLogin,setFirstLogin] = useState(localStorage.getItem("firstLogin")||"")
  
  
//  useEffect(()=>{
//   if(firstLogin && isLogged){
//     navigate("/")
//   }
//  },[firstLogin,isLogged])
    
  
  
  const [user,setUser] = useState({
    email:'',password:''
  })
  const onChangeInput = (e)=>{
    const {name, value} = e.target
    setUser({...user,[name]:value})
  }
 
  const loginSubmit = async(e)=>{
    e.preventDefault()
    try {
    const res =  await axios.post('/user/login',{...user})
      localStorage.setItem('firstLogin',true)
      
      setShowmsg(res.data.msg)
      setShowImage(true)
      // const sockettemp = io()
      // setSocket(sockettemp)
      // console.log(socket)
     // setFirstLogin(true)
      //setToken(login.data.accesstoken)
     // navigate("/")
     setTimeout(() => {
      setShowImage(false)
      window.location.href='/'
     }, 3000);
     
    
      
    } catch (err) {
    //  alert(err.response.data.msg)
    setShowmsg(err.response.data.msg)
    }
  }

  return (
    <div className='login-page'>
      <form onSubmit={loginSubmit}>
      <h2>{t('login')}</h2>
        <input type='email' name='email' required 
        placeholder='Email' value={user.email} onChange={onChangeInput}/>
        <input type='password' name='password' required autoComplete='on' 
        placeholder='password' value={user.password} onChange={onChangeInput}/>
        <div className='row'>
          <button type='submit'>{t('login')}</button>
          <Link to='/register'>{t('register')}</Link>
          <Link to='/forgot-password'>{t('forgotPassword')}</Link>
        </div>
      </form>
      <label>{showMsg}</label>
      {
              showImage&&
            < img src={success} style={{width:'150px'}}/>
            }
    </div>
  )
}

export default Login

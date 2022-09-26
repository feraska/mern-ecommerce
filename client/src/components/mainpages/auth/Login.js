import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
const Login = () => {
  const {t} = useTranslation()
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
      await axios.post('/user/login',{...user})
      localStorage.setItem('firstLogin',true)
      window.location.href='/'
    } catch (err) {
      alert(err.response.data.msg)
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
          {/* <Link to='/forgot-password'>{t('forgotPassword')}</Link> */}
        </div>
      </form>
    </div>
  )
}

export default Login

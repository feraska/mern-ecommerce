import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
const ForgotPassword = () => {
    const [email,setEmail] = useState('')
    const {t} = useTranslation()
    const clickHandler = ()=>{

    }
  return (
    <div className="user-data">
        <div className='email'>
        <label htmlFor="email">{t('email')}</label>
        <input type="email" name="email"  onChange={(e)=>setEmail(e.target.value)} />
        <button onClick={clickHandler}>{t('send')}</button>
        </div>
        </div>
  )
}

export default ForgotPassword

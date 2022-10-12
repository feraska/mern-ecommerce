import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import success from '../../headers/icon/success.gif'
const Register = () => {
  const {t} = useTranslation()
  const [showImage,setShowImage] = useState(false)
  const [showMsg,setShowmsg] = useState("")
  const [user, setUser] = useState({
    name:'', email:'', password: ''
})
const onChangeInput = (e) =>{
  const {name, value} = e.target;
  setUser({...user, [name]:value})
}

const registerSubmit = async (e) =>{
  e.preventDefault()
  try {
     const res= await axios.post('/user/register', {...user})
    // if(res){
      setShowImage(true)
   //  }
      setShowmsg(res.data.msg)
      //localStorage.setItem('firstLogin', true)
      //alert(res.data.msg)
      setTimeout(() => {
        setShowImage(false)
        window.location.href = "/";
      }, 3000);
      
    
  } catch (err) {
      //alert(err.response.data.msg)
      setShowmsg(err.response.data.msg)
  }
}

  return (
    <div className="login-page">
            <form onSubmit={registerSubmit}>
                <h2>{t('register')}</h2>
                <input type="text" name="name" required
                placeholder="Name" value={user.name} onChange={onChangeInput} />

                <input type="email" name="email" required
                placeholder="Email" value={user.email} onChange={onChangeInput} />

                <input type="password" name="password" required autoComplete="on"
                placeholder="Password" value={user.password} onChange={onChangeInput} />
      
                <div className="row">
                   
                    <button type="submit">{t('register')}</button>
                    <Link to="/login">{t('login')}</Link>
      
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

export default Register

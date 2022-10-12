import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { GlobalState } from '../../../GlobalState'
import  './userData.css'
import Loading from '../utils/loading/Loading'
const UserData = () => {
 
    const {t} = useTranslation()
    const state = useContext(GlobalState)
    const [token] = state.token
    const [onEditEmail,setOnEditEmail] = useState(false)
    const [onEditName,setOnEditName] = useState(false)
    const[name,setName] = useState(state.userAPI.name)
    const [email,setEmail] = useState(state.userAPI.email)
    const [callback,setCallback] = state.userAPI.callback
    // const [img] = state.userAPI.images.url
    const [images, setImages] = useState(false)
    const [loading, setLoading] = useState(false)
    const [onEditImage, setOnEditImage] = useState(false)

    const styleUpload = {
      display: images ? "block" : "none"
  }
    const handleUpload = async (e) =>{
      e.preventDefault()
      try {
          const file = e.target.files[0]
       
          if(!file){
              return alert("File not exist.")
          }
          if(file.size > 1024*1024){
              return alert("Size too large!")
          }
          if(file.type !=='image/jpeg' && file.type !=='image/png'){
              return alert("File format is incorrect.")
          }
         
          let formData = new FormData()
          formData.append('file',file)
          setLoading(true)
          
          const res = await axios.post('/api/uploadImg',formData,{
              headers:{'content-type':'multipart/form-data',Authorization:token}
          })
          setLoading(false)
          console.log(res.data)
          setImages(res.data)
          setOnEditImage(true)
      } catch (err) {
          alert(err.response.data.msg)
      }
  }

    const handleDestroy = async (e) =>{
      try {
       
         setLoading(true)
         await axios.post('/api/destroyImg',{public_id:images.public_id},{
          headers:{Authorization:token}
         })
         setLoading(false)
         setImages(false)
         setOnEditImage(false)
      
      } catch (err) {
          alert(err.response.data.msg)
          
      }
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()
    try {
        
        if(!images){
            return alert("No image Upload")
           }
           
            await axios.patch(`/user/update/img`,{images},{
                headers:{Authorization:token}
            })
           
           
        
        setImages(false)
        // setProduct(initialState)      
        setCallback(!callback)
        //setCallback(false)
    } catch (err) {
        alert(err.response.data.msg)
    }
}

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
        <button style=
        {
          onEditImage?{display:'block'}:{display:'none'}
        } onClick={handleSubmit}>{t('changeImage')}</button>
        
        <div className="upload">
        <input type="file" name="file" id="file_up" onChange={handleUpload}  />
        {
            loading?<div id="file_img"><Loading/></div>
            :<div id="file_img" style={styleUpload}>
            <img src={images?images.url:''}alt=""/>
            <span onClick={handleDestroy} >X</span>
        </div>
        }
            
            </div>
    
    </div>
  )
}

export default UserData

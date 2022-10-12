import axios from 'axios'
import React,{useEffect,useRef,useContext} from 'react'
import { GlobalState } from '../../../../GlobalState'
import './formInput.css'
import { useTranslation } from 'react-i18next'
const FormInput = ({id, socket, rating}) => {
    const state = useContext(GlobalState)
    const { t } = useTranslation(); 

    const [name] = state.userAPI.name
    const [token] = state.token
    const [callback,setCallback] = state.productsAPI.callback
    // const [page]
    // const nameRef = useRef()
    const contentRef = useRef()
    const patchData = async(id,rating)=>{
      const data = await axios.patch(`/api/products/${id}`,{rating})
      setCallback(!callback)
      // console.log(data.data)
  }
    const commentSubmit = ()=>{
        const content = contentRef.current.innerHTML
        const createAt = new Date().toISOString()
        socket.emit('createComment',{
            writer:token,content,product_id:id,createAt,rating
        })
        if(rating &&rating!==0){
          patchData(id,rating)
        }
       // setCallback(!callback)
        contentRef.current.innerHTML = ''
    }
  return (
    
    <div className='form_input'>
       
     <p>{t('content')}</p>
     <div ref={contentRef}
     contentEditable="true"
     style={{
        height:'100px',
        border:'1px solid #ccc',
        padding:'5px 10px',
        outline:'none'
     }}
     >
     </div>
     <button onClick={commentSubmit}>{t('send')}</button>
     


    
    
    </div>
  )
}

export default FormInput

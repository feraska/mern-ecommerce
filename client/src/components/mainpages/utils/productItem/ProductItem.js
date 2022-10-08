import axios from 'axios'
import React,{useContext, useState} from 'react'
import {Link} from 'react-router-dom'
import BtnRender from './BtnRender'
import Loading from '../loading/Loading'
const ProductItem = ({product,setProducts,isAdmin,token,callback,setCallback}) => {
  const [loading ,setLoding] = useState(false)
  
  const deleteProduct = async () =>{
   try {
    setLoding(true)
    const destroyImg = axios.post('/api/destroy',{public_id:product.images.public_id},{
      headers:{Authorization:token}
    })
    const deleteProduct = axios.delete(`/api/products/${product._id}`,{
      headers:{Authorization:token}
    })
    await destroyImg
    await deleteProduct
    setLoding(false)
    setCallback(!callback)
    
    
   } catch (err) {
      alert(err.response.data.msg)
   }
  }
  if(loading){
    return<Loading/>
  }
  const handleCheck = () =>{
   
  }
  return (
    <div className='product_card'>
      {
        isAdmin && <input type='checkbox' checked={product.checked}
        onChange={handleCheck}
         />
      }
        <img src={product.images.url} alt=''/>

        <div className='product_box'>
            <h2 title={product.title}>{product.title}</h2>
            
            <span>₪{product.price.toString().length>3?
            product.price.toString().slice(0,(product.price.toString().length-3)).
            concat(",",product.price.toString().slice((product.price.toString().length-3)))
            
            :
            product.price
            }</span>
            
            <p>{product.description}</p>
        </div>

        <BtnRender product={product} deleteProduct={deleteProduct}/>
        </div>
  )
}

export default ProductItem

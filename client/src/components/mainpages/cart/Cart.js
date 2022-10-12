import React, { useContext, useEffect, useState } from 'react'
import { GlobalState } from '../../../GlobalState'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
const Cart = () => {
  const state = useContext(GlobalState)
  const [cart,setCart] = state.userAPI.cart
  const [total,setTotal] = useState(0)
  const [callback,setCallback] = state.userAPI.callback
  const [token] = state.token
  const { t } = useTranslation(); 
  const [showMsg,setShowmsg] = useState("")

  useEffect(()=>{
    const getTotal = ()=>{
    const total = cart.reduce((prev,item)=>{
        return prev +(item.price * item.quantity)
      },0)
      setTotal(total)
    }
    getTotal()
  },[cart])
  

  const addToCart = async ()=>{
    await axios.patch('/user/addCart',{cart},{
      headers:{Authorization:token}
    })
  }
  const increment = (id)=>{
    cart.forEach(item=>{
      if(item._id===id){
        item.quantity+=1
      }
    })
    setCart([...cart])
    addToCart()
  }

  const decrement = (id)=>{
    cart.forEach(item=>{
      if(item._id===id){
        item.quantity===1?item.quantity=1:item.quantity-=1
      }
    })
    setCart([...cart])
  }
  const removeProduct = (id)=>{
    if(window.confirm(t('deleteMsg'))){
      cart.forEach((item,index)=>{
        if(item._id===id){
         // console.log(index)
          cart.splice(index,1)
        }
      })
      setCart([...cart])
      addToCart()
    }
  }
  const tranSuccess = async() => {
    await axios.post('/api/payment', {cart}, {
        headers: {Authorization: token}
    })

    setCart([])
    addToCart([])
   // alert(t('succorder'))
   setShowmsg(t('succorder'))
    //setCallback(!callback)
}

  if(cart.length ===0){
    return <h2 style={{textAlign:"center",fontSize:"5rem"}}>Cart Empty</h2>
  }
  return (
    <div>
      {
        cart.map(product=>(
          <div className='detail cart' key={product._id}>
      <img src={product.images.url} alt='' className='img_container'/>

      <div className="box-detail">
                    
                        <h2>{product.title}</h2>
                    
                    <h3>₪ {
                    (product.price*product.quantity).toString().length>3?
                    (product.price*product.quantity).toString().
                    slice(0,((product.price*product.quantity).toString().length-3)).
                    concat(",",(product.price*product.quantity).toString().
                    slice(((product.price*product.quantity).toString().length-3)))
                    
                    :
                    product.price*product.quantity}</h3>
                    <p>{product.description}</p>
                    <p>{product.content}</p>
                    <div className='amount'>
                      <button onClick={()=>decrement(product._id)}> - </button>
                      <span>{product.quantity}</span>
                      <button onClick={()=>increment(product._id)}> + </button>
                      </div>
                    <div className='delete' onClick={()=>removeProduct(product._id)}>X</div>
                    </div>

    </div>
        ))
      }
      <div className='total'>
        <h3>{t('total')}: ₪ {total.toString().length>3?
            total.toString().slice(0,(total.toString().length-3)).
            concat(",",total.toString().slice((total.toString().length-3)))
            :total
          }</h3>
        <button  onClick={()=>tranSuccess()}>{t('payment')}</button>
        <label>{showMsg}</label>
      </div>
    </div>
  )
}

export default Cart

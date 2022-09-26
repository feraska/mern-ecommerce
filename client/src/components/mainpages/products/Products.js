import {React,useContext, useEffect, useState} from 'react'
import { GlobalState } from '../../../GlobalState'
import ProductItem from '../utils/productItem/ProductItem'
import Loading from '../utils/loading/Loading'
import Filters from './Filters'
import LoadMore from './LoadMore'
import { useTranslation } from 'react-i18next'



const Products = () => {
  const state = useContext(GlobalState)
  const [products,setProducts] = state.productsAPI.products
  const [msg,setMsg] = state.productsAPI.message
  const [isAdmin] = state.userAPI.isAdmin
  const [token] = state.token
  const [loading, setLoding] = state.productsAPI.loading
 
  const [callback,setCallback] = state.productsAPI.callback
  const { t } = useTranslation(); 


  if(loading){
    return <Loading/>
  }

  
  return (
    <>
    <Filters/>
    
    <div className='products'>
      
      {
       msg?<label>{t('empty')}</label>:
        products.map(product=>{
          return <ProductItem key={product._id} product={product} isAdmin={isAdmin} token={token}
          callback={callback} setCallback={setCallback} setProduct={setProducts}
          />
        })
      }
    </div>
    <LoadMore/>
    
    
    </>
  )
    
}

export default Products

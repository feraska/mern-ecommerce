import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'
import Loading from '../utils/loading/Loading'

const LoadMore = () => {
    const state = useContext(GlobalState)
    const [page ,setPage] = state.productsAPI.page
    const [loading,setLoding] = state.productsAPI.loading
    const [result] = state.productsAPI.result
    const maxNumber = 9
    let p = []
   // useEffect(()=>{
    
    let pages = 1
    if(result%maxNumber==0){
        pages=result/maxNumber
        
    }
    else{
        pages = (result/maxNumber)+1
    }
    for(let i= 1 ;i<=pages;i++){
      
     p.push(i)
    }
  //  },[])
    

    
  return (
    <>
    {
        p.map(num =>(
        
            <Link onClick={(e)=>setPage(num)} key={num} className='load_more'
            >{num}</Link>
        ))
    }
    </>
  
  )
}

export default LoadMore

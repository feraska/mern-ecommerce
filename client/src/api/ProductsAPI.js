import React, {useState,useEffect} from 'react'

import axios from 'axios'
const ProductsAPI = () => {
    const [products,setProducts] = useState([])
    const [callback,setCallback] = useState(false)
    const [category,setCategory] = useState('')
    const [sort, setSort] = useState('')
    const [search,setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [result, setResult] = useState(0)
    const [allProducts,setAllProducts] = useState([])
    const [msg, setMsg] = useState(false)
    const maxPage = 9
    const [loading,setLoading] = useState(false)
    const getProducts = async()=>{
      window.scrollTo(0,0)
      setLoading(true)
      const res = await axios.get(`/api/products?limit=${maxPage}&page=${page}&${category}&${sort}&title[regex]=${search}`)
        if(res.data.msg){
          setMsg(true)
        }
        else{
          setMsg(false)
        }

       // console.log(res.data.products)
       setProducts(res.data.products)
       setResult(res.data.result)
       setAllProducts(res.data.allProducts)
       setLoading(false)
    }
    useEffect(()=>{
      
        getProducts()
    },[callback,category,sort,search,page])
  return{
    products:[products,setProducts],
    callback:[callback,setCallback],
    category:[category,setCategory],
    sort:[sort, setSort],
    search:[search,setSearch],
    page:[page, setPage],
    result:[result, setResult],
    allProducts:[allProducts,setAllProducts],
    message:[msg,setMsg],
    loading:[loading,setLoading]

  }
}

export default ProductsAPI

import React, { useContext } from 'react'
import {Routes,Route} from 'react-router-dom'
import Products from './products/Products'
import Login from './auth/Login'
import Register from './auth/Register'
import Cart from './cart/Cart'
import Categories from './categories/Categories'
import OrderHistory from './history/OrderHistory'
import OrderDetails from './history/OrderDetails'
import NotFound from './utils/not_found/NotFound'
import DetailProduct from './detailProduct/DetailProduct'
import CreateProduct from './createProduct/CreateProduct'
import { GlobalState } from '../../GlobalState'
import UserData from './UserData/UserData'
import ForgotPassword from './forgotPassword/ForgotPassword'
const Pages = () => {
  const state = useContext(GlobalState)
  const [isLogged] = state.userAPI.isLogged
  const [isAdmin] = state.userAPI.isAdmin
 // console.log("logged",isLogged)
  return (
         <Routes>
          <Route path='/?lng' element={<NotFound/>}/>
        <Route path='/' element={<Products/>} />
        <Route path='/user' element={isLogged?<UserData/>:<NotFound/>} />
        <Route path='/detail/:id' element={<DetailProduct/>} />
        <Route path='/login' element={isLogged?<NotFound/>:<Login/>}/>
        <Route path='/category' element={isAdmin?<Categories/>:<NotFound/>}/>
        <Route path='/register' element={isLogged?<NotFound/>:<Register/>}/>
        <Route path='/create_product' element={isAdmin?<CreateProduct/>:<NotFound/>}/>
        <Route path='/edit_product/:id' element={isAdmin?<CreateProduct/>:<NotFound/>}/>
        <Route path='/history' element={isLogged?<OrderHistory/>:<NotFound/>}/>
        <Route path='/history/:id' element={isLogged?<OrderDetails/>:<NotFound/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/forgot-password' element={isLogged?<NotFound/>:<ForgotPassword/>}/>
        <Route path='*' element={<NotFound/>}/>
         </Routes>
       
  )
}

export default Pages

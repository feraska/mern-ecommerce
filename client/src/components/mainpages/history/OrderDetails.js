import React, {useState, useEffect, useContext} from 'react'
import {useParams} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import { useTranslation } from 'react-i18next'

const OrderDetails = () => {
    const { t } = useTranslation(); 

    const state = useContext(GlobalState)
    const [history] = state.userAPI.history
    const [orderDetails, setOrderDetails] = useState([])

    const params = useParams()

    useEffect(() => {
        if(params.id){
            history.forEach(item =>{
                if(item._id === params.id){
                 setOrderDetails(item)
                }
            })
        }
    },[params.id, history])
    if(orderDetails.length === 0)
    {
     return null;
    }
  return (
    <div className="history-page">
    

    <table style={{margin: "30px 0px"}}>
        <thead>
            <tr>
                <th></th>
                <th>{t('products')}</th>
                <th>{t('quantity')}</th>
                <th>{t('price')}</th>
            </tr>
        </thead>
        <tbody>
            {
                orderDetails.cart.map(item =>(
                <tr key={item._id}>
                    <td><img src={item.images.url} alt="" /></td>
                    <td>{item.title}</td>
                    <td>{item.quantity}</td>
                    <td>₪ {(item.price*item.quantity).toString().length>3?
                    (item.price*item.quantity).toString().
                    slice(0,((item.price*item.quantity).toString().length-3)).
                    concat(",",(item.price*item.quantity).toString().
                    slice(((item.price*item.quantity).toString().length-3)))
                    
                    :item.price*item.quantity}</td>
                </tr>
                ))
            }
            
        </tbody>
    </table>
</div>
  )
}

export default OrderDetails

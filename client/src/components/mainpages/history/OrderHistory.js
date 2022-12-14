import React,{useContext,useEffect} from 'react'
import { GlobalState } from '../../../GlobalState'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useTranslation } from 'react-i18next'

const OrderHistory = () => {
    const { t } = useTranslation(); 

    const state = useContext(GlobalState)
    const [history, setHistory] = state.userAPI.history
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    useEffect(() => {
        if(token){
            const getHistory = async() =>{
                if(isAdmin){
                    const res = await axios.get('/api/payment', {
                        headers: {Authorization: token}
                    })
                   
                    setHistory(res.data)
                }else{
                    const res = await axios.get('/user/history', {
                        headers: {Authorization: token}
                    })
                    setHistory(res.data)
                    
                }
            }
            getHistory()
        }
    },[token, isAdmin, setHistory])
  return (
    <div className="history-page">
    <h2>{t('history')}</h2>

    <h4>{t('have')} {history.length} {t('ordered')}</h4>

    <table>
        <thead>
            <tr>
                <th>{t('paymentID')}</th>
                <th>{t('dateOfPurchased')}</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {
                history.map(items => (
                    <tr key={items._id}>
                        <td>{items._id}</td>
                        <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                        <td><Link to={`/history/${items._id}`}>{t('view')}</Link></td>
                    </tr>
                ))
            }
        </tbody>
    </table>
</div>
  )
}

export default OrderHistory

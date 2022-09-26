import React,{useContext} from 'react'
import { Link } from 'react-router-dom'
import { GlobalState } from '../../../../GlobalState'
import { useTranslation } from 'react-i18next'

const BtnRender = ({product,deleteProduct}) => {
    const { t } = useTranslation(); 

    const state = useContext(GlobalState)
    //const [products] = state.productsAPI.products
    const [isAdmin] = state.userAPI.isAdmin
    const addCart = state.userAPI.addCart
    return(
    <div className="row_btn">
            {
                isAdmin?
                <>
                <Link id="btn_buy" to="#!"onClick={deleteProduct}>
                {t('delete')}
            </Link>
            <Link id="btn_view" to={`/edit_product/${product._id}`}>
                {t('edit')}
            </Link>
            </>:
            <>
             <Link id="btn_buy" to="#!" onClick={()=>addCart(product)}>
                {t('buy')}
            </Link>
            <Link id="btn_view" to={`/detail/${product._id}`} onClick={()=>window.scrollTo(0,0)}>
                {t('view')}
            </Link>
            </>
            }
            </div>
    )
        
}
    
     
        

export default BtnRender

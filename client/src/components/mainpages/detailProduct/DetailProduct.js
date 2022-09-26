import React,{ useContext,useState,useEffect} from 'react'
import { useParams,Link } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'
import ProductItem from '../utils/productItem/ProductItem'
import { useTranslation } from 'react-i18next'

const DetailProduct = () => {
    const { t } = useTranslation(); 

    const params = useParams()
    const state = useContext(GlobalState)
    const [products] = state.productsAPI.products
    const [detailProduct,setDetailProduct] = useState([])
    useEffect(()=>{
        if(params.id){
            products.forEach(product=>{
                if(product._id===params.id){
                    setDetailProduct(product)
                }
            })
        }
    },[params.id,products])
    console.log(detailProduct)
    if(detailProduct.length===0){
        return null
    }
  return (
    <>
    <div className='detail'>
      <img src={detailProduct.images.url} alt=''/>

      <div className="box-detail">
                    <div className="row">
                        <h2>{detailProduct.title}</h2>
                        
                    </div>
                    <span>₪ {detailProduct.price.toString().length>3?
            detailProduct.price.toString().slice(0,(detailProduct.price.toString().length-3)).
            concat(",",detailProduct.price.toString().slice((detailProduct.price.toString().length-3)))
            
            :
            detailProduct.price}</span>
                    <p>{detailProduct.description}</p>
                    <p>{detailProduct.content}</p>
                    <p>Sold: {detailProduct.sold}</p>
                    <Link to="/cart" className="cart">
                        {t('buy')}
                    </Link>
                    </div>

    </div>
    <div>
    <h2>{t('relatedProducts')}</h2>
    <div className="products">
        {
            products.map(product => {
                return product.category === detailProduct.category 
                    ? <ProductItem key={product._id} product={product} /> : null
            })
        }
    </div>
    </div>
    </>
  )
}

export default DetailProduct

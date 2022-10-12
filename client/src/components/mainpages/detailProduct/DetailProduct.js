import React,{ useContext,useState,useEffect, useRef} from 'react'
import { useParams,Link } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'
import ProductItem from '../utils/productItem/ProductItem'
import { useTranslation } from 'react-i18next'
import Rating from '../utils/rating/Rating'
import FormInput from '../utils/formInput/FormInput'
import CommentItem from '../utils/commentItem/CommentItem'
import axios from 'axios'
import Loading from '../utils/loading/Loading'
const DetailProduct = () => {
    const { t } = useTranslation(); 
    const [rating, setRating] = useState(0)
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(false)
    const params = useParams()
    const state = useContext(GlobalState)
    const [products] = state.productsAPI.products
    const [detailProduct,setDetailProduct] = useState([])
    const [socket] = state.socket
    const [page,setPage] = useState(1)
    const pageEnd = useRef()
    const [isLogged] = state.userAPI.isLogged
    const getComment = async(id) =>{
        setLoading(true)
        console.log(id)
        const comment = await axios.get(`/api/comments/${id}?limit=${page*3}`)
        // console.log(comment)
        // console.log(comment)
        setComments(comment.data)
        setLoading(false)
        
    }
   
    useEffect(()=>{
        if(params.id){
            products.forEach(product=>{
                if(product._id===params.id){
                    setDetailProduct(product)
                    getComment(params.id)
                }
            })
        }
    },[params.id,products,page])
    useEffect(()=>{
        if(socket){
            
            socket.emit('joinRoom',params.id)
            // console.log("socket",socket)
        }
    },[socket,params.id])
    useEffect(()=>{
        if(socket){
            socket.on('sendCommentToClient',msg=>{
               // console.log("socket#",socket)
                // console.log("msg",msg)
                //setComments([msg,...comments])
                setComments(msg)
            })
            return()=>socket.off('sendCommentToClient')
        }
    },[socket,comments])
    // console.log(detailProduct)
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
                    <div>
                        <h3 style={{margin:'10px 0'}}>{t('rating')}: {detailProduct.numReviews} {t('reviews')}</h3>
                        <Rating detailProduct={detailProduct}/>

                    </div>

                    </div>

    </div>

    <div>
    <h2>{t('relatedProducts')}</h2>
    <div className="products">
        {
            products.map(product => {
                return product.category === detailProduct.category &&product._id!==detailProduct._id
                    ? <ProductItem key={product._id} product={product} /> : null
            })
        }
    </div>
    </div>
    <div className='comments'>
        <h2 className='app_title'>{t('comments')}</h2>
        {isLogged&&<>
        <div className="reviews">
                    <input type="radio" name="rate" id="rd-5" onChange={() => setRating(5)} />
                    <label htmlFor="rd-5" className="fas fa-star"></label>

                    <input type="radio" name="rate" id="rd-4" onChange={() => setRating(4)} />
                    <label htmlFor="rd-4" className="fas fa-star"></label>

                    <input type="radio" name="rate" id="rd-3" onChange={() => setRating(3)} />
                    <label htmlFor="rd-3" className="fas fa-star"></label>

                    <input type="radio" name="rate" id="rd-2" onChange={() => setRating(2)} />
                    <label htmlFor="rd-2" className="fas fa-star"></label>

                    <input type="radio" name="rate" id="rd-1" onChange={() => setRating(1)} />
                    <label htmlFor="rd-1" className="fas fa-star"></label>
                </div>
                
                
                <FormInput id={params.id} socket={socket} rating={rating} />
        </>}
                
                <div className='comments_list'>
                {
                    comments.map(comment=>(
                        <CommentItem key={comment._id} comment={comment}/>
                    ))
                }
                </div>
                {
                    loading&&
                   <Loading/>
                }
                <button ref={pageEnd} onClick={()=>setPage(page+1)}>{t('loadMore')}</button>
                </div>

    
            
    
    
    </>
  )
}

export default DetailProduct

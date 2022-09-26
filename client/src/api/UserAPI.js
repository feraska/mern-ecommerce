import React,{useState , useEffect} from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'

const UserAPI = (token) => {
    const { t } = useTranslation(); 

    const [isLogged,setIsLogged] = useState(false)
    const [isAdmin,setIsAdmin] = useState(false)
    const [cart,setCart] = useState([])
    const [history, setHistory] = useState([])
    const [callback, setCallback] = useState(false)
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')

    useEffect(()=>{
        //console.log("token",token)
        if(token){
           // console.log("token",token)
            const getUser = async()=>{
                try {
                    const res = await axios.get('/user/infor',{
                        
                        headers:{Authorization:token}
                    })
                    setIsLogged(true)
                    
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)
                    setCart(res.data.cart)
                    setEmail(res.data.email)
                    setName(res.data.name)
                } catch (err) {
                    alert(err.response.data.msg)
                }
            }
            getUser()
        }
    },[token,callback])
    const addCart = async (product) => {
        if(!isLogged) return alert(t('loginMsg'))

        const check = cart.every(item =>{
            return item._id !== product._id
        })

        if(check){
            setCart([...cart, {...product, quantity: 1}])

            await axios.patch('/user/addcart', {cart: [...cart, {...product, quantity: 1}]}, {
                headers: {Authorization: token}
            })

        }else{
            alert(t('cartMsg'))
        }
    }
  return {
    isLogged:[isLogged,setIsLogged],
    isAdmin:[isAdmin,setIsAdmin],
    cart:[cart,setCart],
    addCart:addCart,
    history: [history, setHistory],
    callback:[callback, setCallback],
    name:[name],
    email:[email],
  }
}

export default UserAPI

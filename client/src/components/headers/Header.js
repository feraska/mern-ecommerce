import {useState,useContext, useEffect} from 'react'


import {GlobalState} from '../../GlobalState'
import Menu from './icon/menu.svg'
import Close from './icon/close.svg'
import Cart from './icon/cart.svg'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import { useLocation } from 'react-router-dom'


const Header = () => {
    
    const state = useContext(GlobalState)
    const { t } = useTranslation()
    //console.log('state',state)
    const [allproducts] = state.productsAPI.allProducts
    const [search,setSearch] = state.productsAPI.search
    const [name,setName] = state.userAPI.name 
    const [page, setPage] = state.productsAPI.page
    const [isLogged,setIsLogged] = state.userAPI.isLogged
    const [isAdmin,setIsAdmin] = state.userAPI.isAdmin
    const [cart] = state.userAPI.cart
    const [lang,setLang] = useState('')
    const navigate = useNavigate()
    const [token,setToken] = state.token
    const [images] = state.userAPI.images
    const [socket,setSocket] = state.socket
  
    const languages = [
        { value: '', text: t('options') },
        { value: 'en', text: "English" },
        { value: 'he', text: "עברית" },
        { value: 'ar', text: "العربيه "},
      ]
      useEffect(()=>{
        if(lang){
        window.location.replace("?lng="+lang)
        }
      },[lang])
      const handleChange = (e) => { 
        localStorage.setItem('lang',e.target.value)
        setLang(e.target.value)
    }

   
    
    
    const logoutUser = async() =>{
        await axios.get('/user/logout')
        localStorage.removeItem('firstLogin')
       // setIsLogged(false)
        //setIsAdmin(false)
        
         window.location.href = "/"
        
        //navigate("/")
        window.scrollTo(0,0)
       // return ()=>socket.close()
        
    }
    const adminRouter = ()=>{
        return(
            <>
            <li><Link to='/create_product' onClick={()=>window.scrollTo(0, 0)}>{t('createProduct')}</Link></li>
            <li><Link to='/category' onClick={()=>window.scrollTo(0, 0)}>{t('categories')}</Link></li>
            </>
        )
    }
    const loggedRouter = ()=>{
        return(
            <>
            <li><Link to='/history' onClick={()=>window.scrollTo(0, 0)}>{t('history')}</Link></li>
            <li><Link to='/user' onClick={()=>window.scrollTo(0, 0)}> {t('userDetails')}</Link></li>
            <li><Link to='/' onClick={logoutUser} >{t('logout')}</Link></li>
           
            </>
        )
    }
    const searchHandler = (e) =>{
     // setSearch(e.target.value)
      const {value} = e.target
      //if(value){
     // if(value!==""){
      setSearch(value)
      setPage(1)
      
     // setProducts(allproducts)
     // }
     //}
     //  else{
       //  setSearch('')
     //  }
        
    }
    
   
  return (
   <header>
    <div style={{
    
    marginRight:'55px',
    padding:'25px',
    display:'flex',
   width:'22%',
    
    justifyContent:'space-between'

   }}>
    
   <label>{t('choose')}</label>
    <select  onChange={handleChange}>
                {languages.map(item => {
                    return (<option key={item.value} 
                    value={item.value}>{item.text}</option>);
                })}
            </select>
            </div>
            {isAdmin?'Admin':name}
        <div className='menu'>
            <img src={Menu} alt="" width='30' onClick={()=>alert('d')}/>
            
        </div>
        <img className='profile-img' src={images?images.url:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHoAAACHCAMAAADui70RAAAAMFBMVEXy8vK7v8LM0NO4vL/19fXu7+/s7OzJzdDp6enEyMvBxcff4OC+wsXW2dvj4+PS1dfLBHO+AAADgElEQVR4nO2ayRKkMAiGVVDj/v5vO3HpaWNHBYTMYfwPnqz6iiQsgWTZq1evXr169erVq1dPhIvSY7Nq7AavbqyydHxEN9U9/FVfd1USOlZDDpAH8viutIZjVeQH7kbvJ2P4EAev8M6Oja49BS/w2spw7C7By56PNuzpjjzDTRadQvbsQZ2NBYlswMaBSFZfcxzJZK9KE132DHLeKJKx5hitut23Dn2U2pJjyyRDrWU264ytbCWzseGScyh0zK7YRnu2CpkRTXZonbjCX28vlRWXrHee9+Vz8n2WjgqcApqWLH/QCpuNtYScw6Sw2dxQtkkhoJVCtEL64uVLXfR/abX0mDUKJ1wUR1VO+D/0a3E0e0yW1CgLWqNOKSXkvFUgS/O1BllWpejcdkvJZmuARe6lkjJnOX4drlAeLcKGyVYz2pvNNFqjJtzEjGi6l3tO+oJaEcwrxntVMqejoXXL/LLJMU2/a0e8hZj07EhrDs6kU4muv4FDU1n1Z8ubluFkw13h47nh0Nos9hfexXvi0Bj1owO4m2cuARb6yWqTD+ysHKemX5j+0zaDM5+57PFYVm70cj9jLuW5E7phoC0p/U8aeGzAry0lTvn06lUrnXV0W5FCqXrWWgqgULB8H0YIN7hPXod8eEwedn502+feVzPwLIVhFfbgb9LSIbFCIfc57H7C5pUlPyldHlpj1cHFhSb6uzB7R9MUnGQnPPldMgYpT+p+aCOGY2RvPhvOJ58PbX3EyAI6ZuP5/QTY/Zyrwhug8cFyeyWBmZsuZ8vAa2Nd2Pyh5800DcNULDH2+l9WM4nUSFgfSVB+pLOZwzwCm3rzFLarLtk0/xZOHG7YlLiG/B4CRaQrt7AneiPCzZf8MIDNvttu3niex767/Aob7xRdR1QDv/rqesltTvdHV6ec3SDj6WqqPVqCZ50OOtHwjC06zSMmEfTAPnMwmzgWKG62YTT56sRs2VSJiY5mbluf/ijm22Z5I1SsMJeOTbmK1Kf2nrXpJ6wIR5d8RQ5aKqNzOKATRLK/6OOKF6nIv2c80fmedTjjaeLJpiCqiEamUoWdiWSutaBD9xI+w5ApKE2rlOQwhaRI1TvtknbCgDILxh3asvKPoHd3AcFL0Ufo/RFPesDD4jBhGJ218y7Zqxe5du9l0rp1MOHmvkV4rG9M8XkLEipA93WRUM0aSf8Av38uAWW7mP0AAAAASUVORK5CYII='} alt="no"/>
        {/* <div className='logo'>
            <h1>
                
                <Link to='/' onClick={()=>window.scrollTo(0, 0)}>{isAdmin?t('admin'):t('feras')}</Link>
            </h1>
        </div> */}
        <ul>
         
        <li><Link to="/" onClick={()=>window.scrollTo(0, 0)}>{isAdmin?t('products'):t('shop')}</Link></li>  

        {isAdmin && adminRouter()} {
        isLogged?loggedRouter():<li><Link to="/login" onClick={()=>window.scrollTo(0, 0)}>{t('loginRegister')}</Link></li>
            }

        <li>
            <img src={Close} alt='' width='30' className="menu"/>
        </li>
        </ul>
        {
            isAdmin?'':
            <div className='cart-icon'>
            
            <Link to='/cart' onClick={()=>window.scrollTo(0, 0)}>
            <img src={Cart} alt='' width='30'/>
            </Link>
            <span>{cart.length}</span>
            </div>
        }
        
        <Autocomplete /*onKeyUp={searchHandler}*/onSelect={searchHandler}
      disableCloseOnSelect
      
      
      id="combo-box-demo"
      options={allproducts?[...allproducts]:[]}
      clearOnEscape={true}
      getOptionLabel={(option) => option.title}
      sx={{ width: 300 }}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props} 
        >
          <img
            loading="placeholders"
            width="50"
            src={option.images.url}
            alt=""
          />
          {option.title}
        </Box>
      )}
      renderInput={(params) => <TextField  {...params} label={t("products")}
      
      inputProps={{
        ...params.inputProps,
       
      }}
      />}
      
    />
   </header>
   
  )
}

export default Header

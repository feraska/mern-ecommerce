import React,{useState,useContext} from 'react'
import { GlobalState } from '../../../GlobalState'
import axios from 'axios'
import { useTranslation } from 'react-i18next'

const Categories = () => {
    const { t } = useTranslation(); 

    const state = useContext(GlobalState)
    const [categories,setCategories] = state.categoriesAPI.categories
    const [category,setCategory] = useState('')
    const [token] = state.token
    const [callback,setCallback] = state.categoriesAPI.callback
    const [onEdit, setOnEdit] = useState(false)
    const [id, setID] = useState('')
    const [showMsg,setShowmsg] = useState("")

    const createCategory = async(e) =>{
        e.preventDefault()
        try {
            if(onEdit){
                const res = await axios.put(`/api/category/${id}`,{name:category},{
                    headers:{Authorization:token}
                })
                //alert(res.data.msg)
                setShowmsg(res.data.msg)

            }
            else{
                const res = await axios.post('/api/category',{name:category},{
                    headers:{Authorization:token}
                })
                setShowmsg(res.data.msg)
                
                
            }
            setOnEdit(false)
            setCallback(!callback)
            setCategory('')
            
            
           
        } catch (err) {
           // alert(err.response.data.msg)
           setShowmsg(err.response.data.msg)
        }
    }
    const editCategory = async (id, name) =>{
        setID(id)
        setCategory(name)
        setOnEdit(true)
    }
    const deleteCategory = async (id) =>{
        try {
            const res = await axios.delete(`/api/category/${id}`,{
                headers:{Authorization:token}
            })
            //alert(res.data.msg)
            setShowmsg(res.data.msg)
            setCallback(!callback)

        } catch (err) {
           // alert(err.response.data.msg)
           setShowmsg(err.response.data.msg)
            
        }
    }
  return (
    <div className="categories">
    <form onSubmit={createCategory}>
        <label htmlFor="category">{t('category')}</label>
        <input type="text" name="category" value={category} required
        onChange={e => setCategory(e.target.value)} />
        <div className='category-btn'>
        <button type="submit">{onEdit?t('update'):t('create')}</button>
        {onEdit?<button onClick={()=>setOnEdit(false)}>{"cancel"}</button>:''}
        </div>
    </form>

    <div className="col">
        {
            categories.map(category => (
                <div className="row" key={category._id}>
                    <p>{category.name}</p>
                    <div>
                         <button onClick={()=>editCategory(category._id,category.name)}>{t('edit')}</button>
                        <button onClick={()=>deleteCategory(category._id)}>{t('delete')}</button> 
                    </div>
                </div>
            ))
        }
        <label>{showMsg}</label>
    </div>
</div>
  )
}

export default Categories

import React, { useContext,useState } from 'react'
import {GlobalState} from '../../../GlobalState'
import { useTranslation } from 'react-i18next'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
// import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
// import CheckBoxIcon from "@material-ui/icons/CheckBox";
// import { Chip } from "@material-ui/core";
// import Button from "@material-ui/core/Button";
// import Checkbox from "@material-ui/core/Checkbox";


const Filters = () => {
  // const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  // const checkedIcon = <CheckBoxIcon fontSize="small" />;
    const state = useContext(GlobalState)
    const [categories] = state.categoriesAPI.categories
    const [category,setCategory] = state.productsAPI.category
    const [sort, setSort] = state.productsAPI.sort
    const [search,setSearch] = state.productsAPI.search
    const [check] = useState([])
    const [nameCategory] = useState([])
    const { t } = useTranslation(); 

    const handleCategory = (e) =>{
      
        setCategory(e.target.value)
        setSearch('')
        // setSearch('')
        // setCategory(check.join("&"))
    }
    const handleCheck = (e) =>{
      const{checked,value,name} = e.target
      console.log(value)
      if(!check.includes(value)&&checked===true){
         check.push(value)
         nameCategory.push(name)
      }
      if(check.includes(value)&&checked===false){
       check.splice(check.indexOf(value))
       nameCategory.splice(check.indexOf(name))
      }
     
     }
  return (
    <div className='filter_menu'>
      <div className='row'>
        <span>{t('filters')}:</span>
       
   
        <select name='category' value={category} onChange={handleCategory}>
        <option value=''>{t('allProducts')}</option>
        {
            categories.map(category=>(
                <option value={"category="+category._id}
                key={category._id}>
                    {category.name} 
                </option>
            ))
        }
        </select>
      </div>
      
      <div className='row'>
        <span>{t('sortBy')}:</span>
        <select name='category' value={sort} onChange={(e)=>setSort(e.target.value)}>
        <option value=''>{t('newest')}</option>
        <option value='sort=oldest'>{t('oldest')}</option>
        <option value='sort=-sold'>{t('bestSales')}</option>
        <option value='sort=-price'>{t('priceHightLow')}</option>
        <option value='sort=price'>{t('priceLowHight')}</option>
        </select>
      </div>
      

    </div>
  )
}

export default Filters

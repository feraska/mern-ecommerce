import React, { useContext } from 'react'
import {GlobalState} from '../../../GlobalState'
import { useTranslation } from 'react-i18next'

const Filters = () => {
    const state = useContext(GlobalState)
    const [categories] = state.categoriesAPI.categories
    const [category,setCategory] = state.productsAPI.category
    const [sort, setSort] = state.productsAPI.sort
    const [search,setSearch] = state.productsAPI.search
    const { t } = useTranslation(); 

    const handleCategory = (e) =>{
        setCategory(e.target.value)
        setSearch('')
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

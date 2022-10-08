import React,{useEffect, useMemo, useState} from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {DataProvider} from './GlobalState'
import Header from './components/headers/Header'
import MainPages from './components/mainpages/Pages'
import { useTranslation } from 'react-i18next'

function App() {
  
  const { t } = useTranslation(); 
 
   
  useEffect(()=>{
   
    if(localStorage.getItem('lang')==null){
        localStorage.setItem('lang','en')
       // window.location.reload(false)
    }
    if(localStorage.getItem('lang')==='en'){
      document.body.style.direction='ltr'
    }
    else{
      document.body.style.direction='rtl'
    }
      
},[localStorage.getItem('lang')])
  
  return (
  
     <DataProvider>
   
      <Router>
    <div className="App">
    
      <Header/>
      <MainPages/>
    </div>
    </Router>
    </DataProvider>
    

  );
}


export default App;

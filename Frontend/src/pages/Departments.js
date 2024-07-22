import { useState } from 'react';
import React from 'react'
import Base from '../components/Base'
import DepartmentList from '../components/DepartmentList';
import DepartmentProduct from '../components/DepartmentProduct';
const Departments=()=> {
  const [selectedCategory, setSelectedCategory] = useState('Electronics');
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };
  return (
    <div>
        <Base/>
        <h1 className='text-center mt-3 mb-3'>{selectedCategory}</h1>
        <div style={{display:'flex'}}>
        <DepartmentList onSelectCategory={handleCategorySelect}/>
        <DepartmentProduct category={selectedCategory}/>
        </div>
       
        </div>
  )
}

export default Departments
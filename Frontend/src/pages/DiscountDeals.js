import React,{useState} from 'react'
import Base from '../components/Base';
import DepartmentList from '../components/DepartmentList';
import DiscountDealsProduct from '../components/DiscountDealsProduct';

const DiscountDeals=()=> {
    const [selectedCategory, setSelectedCategory] = useState('Electronics');
    const handleCategorySelect = (category) => {
      setSelectedCategory(category);
    };
    return (
      <div>
          <Base/>
          <h1 className='text-center mt-3 mb-3'>{selectedCategory}</h1>
          <div style={{display:'flex'}}>
          <DepartmentList onSelectCategory={handleCategorySelect} style={{position:'fixed'}}/>
          <DiscountDealsProduct category={selectedCategory}/>
          </div>
         
          </div>
    )
}

export default DiscountDeals
import React from 'react';
import ProductCard from './ProductCard';
import "../css/AllProducts.css"

const AllProducts = ({product,loading}) => {
    return (
        <div className='product-container'>
        
            {loading && <p>Loading...</p>}
            {
                (product.length > 0) ?
                    product.map((prod, index) => (
                        <ProductCard key={index} product={prod} showName={"More Details"}/>
                    ))
                    :<h1 style={{fontSize:'6vw',position:'absolute', top:'50%',left:'50%', transform:'translate(-50%,-50%)'}}>No Product Found</h1>
            }
        </div>
    );
}

export default AllProducts;

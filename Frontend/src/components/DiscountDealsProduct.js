import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../services/helper';
import ProductCard from './ProductCard';
import '../css/Department.css';
import DiscountDealsProductCard from './DiscountDealsProductCard';

const DiscountDealsProduct = ({ category }) => {
    const [department, setDepartment] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        getAllProductsByCategoryName(category);
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
    }, [category]);

    const getAllProductsByCategoryName = (categoryName) => {
        setLoading(true);
        axios.get(`${BASE_URL}/api/products/category/${categoryName}`)
            .then((response) => {
                console.log(response);
                setDepartment(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
                setError('Failed to fetch products. Please try again later.');
                setLoading(false);
            });
    };

    return (
        <div className='department-container'>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {department.length > 0 ? (
                department.map((depart) => (
                    <DiscountDealsProductCard product={depart} key={depart.id} showName={"More Details"} />
                ))
            ) : (
                <p style={{ width:'fit-content'}}>No products available in this category.</p>
            )}
        </div>
    );
};

export default DiscountDealsProduct;

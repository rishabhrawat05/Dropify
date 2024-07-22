import React, { useEffect, useState } from 'react'
import '../css/ProductDisplay.css';
import { useParams,useNavigate } from 'react-router-dom';
import { getProduct } from '../services/product_service';
import { deleteProductFromCart, newCart, removeFromCart } from '../services/cart_service';
import { toast } from 'react-toastify';
import Base from './Base';
const MyCartProductDisplay=()=> {
  const calculateDiscountedPrice = (price, discountPercent) => {
    return Math.floor(price - (price * (discountPercent / 100)));
  }
    const navigate=useNavigate();
    const [product,setProduct]=useState(null);
    const { id } = useParams();
    useEffect(()=>{
      getProduct(id).then((data)=>{
          setProduct({...data});
      })
  },[]);
  if (!product) {
      return <div>Loading...</div>;
    }
    const removeFromCart=()=>{
      deleteProductFromCart(id);
      toast.success("Item removed successfully");
      navigate("/user/MyCart");
    }
  const addToCart=()=>{
    navigate(`/product/buyProduct/${true}/${product.id}`)
  }
  return (
    <div>
       <Base/> 
    <div className='product-display'>
        <div className='product-img '>
            <img src={product.image} alt="Product"/>
        </div>
        <div className='product-text'>
        <h1>{product.name}</h1>
            <h4>{product.description}</h4>
            {product.discountPercent>0?
            <div style={{display:'flex', gap:'2vw'}}>
            <h3 className='mt-3 mb-3' style={{textDecorationLine:'line-through'}}>{'₹'+product.price+'/-'}</h3>
            <h3 className='mt-3 mb-3'>{'₹'+calculateDiscountedPrice(product.price, product.discountPercent)+'/-'}</h3>
            </div>
:<h3 className='mt-3 mb-3'>{'₹'+product.price+'/-'}</h3>}
            <button style={{backgroundColor:"#BB2D3B", outline:'none', border:'none', padding:'8px 15px',color:'white', borderRadius:'10px', marginRight:'10px' }} onClick={addToCart}>Buy Now</button>
            <button style={{backgroundColor:"#FFCA2C", outline:'none', border:'none',borderRadius:'10px',padding:'8px 15px'}} onClick={removeFromCart}>Remove From Cart</button>

        </div>
    </div>
    </div>
    
  )
}


export default MyCartProductDisplay;
import React, { useEffect, useState } from 'react';
import { getCartByUser } from '../services/cart_service';
import { useNavigate } from 'react-router-dom';

import "../css/productCart.css"
import ProductMyCart from './ProductMyCart';
import { Button } from 'reactstrap';
const Cart = () => {
  const navigate=useNavigate();
  const handleCheckout=()=>{
    navigate(`/user/CartCheckout/${false}/${0}`);
  }
  const [cart, setCart] = useState([]);
  const token = localStorage.getItem('token');
  
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCartByUser(token);
        console.log('Cart data:', data); // Log the entire data object

        
        if (Array.isArray(data)) {
          const allProducts = data.flatMap(cartItem => cartItem.products || []);
          
          setCart(allProducts);
          
        } else {
          setCart(data.products || []);
          
        }
      } catch (error) {
        console.error('Failed to fetch cart:', error);
      }
    };

    fetchCart();
  }, [token]);

  return (
    <>
    {cart.length>0?
    <Button style={{padding:"10px 30px", marginTop:'20px', backgroundColor:"#FFCA2C", color:'black', fontWeight:'900', fontFamily:'serif', border:'2px solid black', display:'flex', position:'relative', left:'85%' }} onClick={handleCheckout}>CheckOut</Button>
    : ""}
  
    <div className='productCart mt-5'>
      {cart.length > 0 ? (
        cart.map((product,index) => (
          <ProductMyCart product={product} key={index} showName={"More Details"}/>
        ))
      ) : (
        <div style={{position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', textAlign:'center' }}>
          <img style={{borderRadius:'50px', height:'200px',width:'200px'}} src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png" alt="" />
          <h1 style={{fontSize:'2vw'}}>Your cart is empty</h1>
          <h5 style={{color:'grey'}}>Looks like you have not added anything to your cart.</h5>
          </div>
      )}
    </div>
    </>
  );
};

export default Cart;

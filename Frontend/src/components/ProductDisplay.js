import React, { useEffect, useState } from 'react';
import '../css/ProductDisplay.css';
import { useParams, useNavigate, NavLink as ReactLink } from 'react-router-dom';
import { getProduct } from '../services/product_service';
import { deleteProductFromCart, newCart } from '../services/cart_service';
import { toast } from 'react-toastify';
import { isLoggedIn } from '../auth';

const ProductDisplay = () => {
    const calculateDiscountedPrice = (price, discountPercent) => {
        return Math.floor(price - (price * (discountPercent / 100)));
      }
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [btnName, setBtnName] = useState("Add To Cart");
    const { id } = useParams();

    useEffect(() => {
        getProduct(id).then((data) => {
            setProduct({ ...data });
        });

        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const productInCart = cart.some(item => item.id === parseInt(id));
        setBtnName(productInCart ? "Remove From Cart" : "Add To Cart");
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    const handleAddToCart = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate("/login");
            return;
        }

        newCart(product.id, token)
            .then((response) => {
                console.log('Product added to cart:', response);
                toast.success("Product Added To Cart");
                setBtnName("Remove From Cart");

                const cart = JSON.parse(localStorage.getItem('cart')) || [];
                cart.push(product);
                localStorage.setItem('cart', JSON.stringify(cart));
            })
            .catch((error) => {
                console.error('Error adding product to cart:', error);
            });
    };

    const removeFromCart = () => {
        deleteProductFromCart(id)
            .then(() => {
                toast.success("Item removed successfully");
                setBtnName("Add To Cart");

                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                cart = cart.filter(item => item.id !== parseInt(id));
                localStorage.setItem('cart', JSON.stringify(cart));

                navigate("/user/MyCart");
            })
            .catch((error) => {
                console.error('Error removing product from cart:', error);
            });
            
    };
    const CheckOutPage=()=>{
        if(isLoggedIn()){
            navigate(`/product/buyProduct/${true}/${product.id}`);
        }
        else{
            navigate("/login");
        }
        
    }

    return (
        <div>
            <div className='product-display'>
                <div className='product-img'>
                    <img style={{objectFit:'contain', height:'400px'}} src={product.image} alt="Product" />
                </div>
                <div className='product-text'>
                    <h1>{product.name}</h1>
                    <h4>{product.description}</h4>
                    {product.discountPercent>0?
                    <div style={{display:'flex', gap:'2vw'}}>
                        <div style={{display:'flex', flexDirection:'column',}}>
                        <h2 style={{fontSize:'2vw',color:'#CC0C39',fontWeight:'100'}}>-{product.discountPercent}%</h2>
                        <h3 className=' mb-3' style={{fontSize:'1vw' ,color:'grey',textDecorationLine:'line-through'}}>₹{product.price}/-</h3>
                        </div>
                    <h3 className='mt-3 mb-3'><sup style={{color:'grey',fontSize:'1.5vw'}}>₹</sup>{calculateDiscountedPrice(product.price,product.discountPercent)}/-</h3>
                    </div>
                :<h3 className='mt-3 mb-3'><sup style={{color:'grey',fontSize:'1.5vw'}}>₹</sup>{product.price}/-</h3>}
                    
                    <button style={{ backgroundColor: "#BB2D3B", outline: 'none', border: 'none', padding: '8px 15px', color: 'white', borderRadius: '10px', marginRight: '10px' }} onClick={CheckOutPage}>Buy Now</button>
                    {btnName === "Add To Cart" ?
                        <button style={{ backgroundColor: "#FFCA2C", outline: 'none', border: 'none', borderRadius: '10px', padding: '8px 15px' }} onClick={handleAddToCart}>{btnName}</button>
                        :
                        <button style={{ backgroundColor: "#FFCA2C", outline: 'none', border: 'none', borderRadius: '10px', padding: '8px 15px' }} onClick={removeFromCart}>{btnName}</button>
                    }
                </div>
            </div>
        </div>
    );
};

export default ProductDisplay;

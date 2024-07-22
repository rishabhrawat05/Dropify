import React,{useState,useEffect} from 'react'
import ProductCheckoutForm from '../components/ProductCheckoutForm'
import { useParams } from 'react-router-dom'
import { checkoutProduct } from '../services/product_service';

const ProductCheckout=()=> {


  return (
    <div>
       
        <ProductCheckoutForm/>
    </div>
  )
}

export default ProductCheckout
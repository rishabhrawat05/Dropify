import React, { useEffect, useState } from 'react'
import { Button,Card,CardBody,CardTitle,CardSubtitle,CardText,CardHeader } from 'reactstrap'
import {NavLink as ReactLink, useNavigate} from 'react-router-dom'

const ProductMyCart=({product,showName})=> {
 
  
  return (
    <Card 
  body
    
  className="ms-4"
  style={{
    width: '17rem',
  }}
>
{product.discountPercent>0?
  <CardHeader style={{height:'50px', width:'40px', backgroundColor:'#68B64C', position:'relative', top:'-7%', left:'2%'}}>
  <h6 style={{width:'fit-content', color:'white', position:'absolute', left:'15%', top:'30%'}}>{product.discountPercent}%</h6>
</CardHeader>
:""
  }
  <img

    
    alt="Sample"
    src={product.image}
    style={{height:'220px', width:'220px', borderRadius:'10px'}}
  />
  <CardBody >
    <CardTitle tag="h6" >
      {product.name}
    </CardTitle>
    {product.discountPercent>0?
    <>
    <CardSubtitle tag="h6" className='mt-3 mb-3' style={{textDecorationLine:'line-through'}}>
      {"₹"+product.price+"/-"}
    </CardSubtitle>
    <CardSubtitle tag="h6" className='mt-3 mb-3'>
    {"₹"+Math.floor(product.price-(product.price*(product.discountPercent/100)))+"/-"}
  </CardSubtitle>
  </>
  :
  <CardSubtitle tag="h6" className='mt-3 mb-3'>
      {"₹"+product.price+"/-"}
    </CardSubtitle>}
    
    <Button color='danger'  tag={ReactLink} to={`/product/mycart/${product.id}`}>
     {showName}
    </Button>
    
  </CardBody>
</Card>
  )
}

export default ProductMyCart;
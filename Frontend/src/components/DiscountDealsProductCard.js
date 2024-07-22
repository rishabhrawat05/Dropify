import React from 'react'
import { Button, Card, CardBody, CardTitle, CardSubtitle, CardHeader } from 'reactstrap'
import { NavLink as ReactLink } from 'react-router-dom'

const DiscountDealsProductCard = ({ product, showName }) => {

  const calculateDiscountedPrice = (price, discountPercent) => {
    return Math.floor(price - (price * (discountPercent / 100)));
  }

  if (product.discountPercent <= 0) {
    return null;
  }

  return (
    <Card
      body
      border
      className="ms-4 mt-4"
      style={{
        width: '17rem',
      }}
    >
      {product.discountPercent > 0 &&
        <CardHeader style={{ height: '50px', width: '40px', backgroundColor: '#68B64C', position: 'relative', top: '-7%', left: '2%' }}>
          <h6 style={{ width: 'fit-content', color: 'white', position: 'absolute', left: '15%', top: '30%' }}>
            {product.discountPercent}%
          </h6>
        </CardHeader>
      }
      <img
        alt="Sample"
        src={product.image}
        style={{ height: '220px', width: '220px', borderRadius: '10px' }}
      />
      <CardBody >
        <CardTitle tag="h6">
          {product.name}
        </CardTitle>
        <CardSubtitle tag="h6" className='mt-3 mb-3' style={{ fontSize:'1vw' ,color:'grey',textDecorationLine:'line-through'}}>
        <sup style={{color:'grey',fontSize:'1vw'}}>₹</sup>{product.price+"/-"}
        </CardSubtitle>
        <CardSubtitle tag="h6" className='mt-3 mb-3'>
        <sup style={{color:'grey',fontSize:'1vw'}}>₹</sup>{Math.floor(product.price-(product.price*(product.discountPercent/100)))+"/-"}
        </CardSubtitle>
        <Button color='danger' tag={ReactLink} to={`/product/${product.id}`}>
          {showName}
        </Button>
      </CardBody>
    </Card>
  );
}

export default DiscountDealsProductCard;

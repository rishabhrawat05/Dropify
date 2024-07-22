import React, { useState, useEffect } from 'react';
import { Col, Row, Container, Button, Input, Form, Label, Card, CardBody, CardHeader, FormGroup, Table } from 'reactstrap';
import Base from './Base';
import { toast } from 'react-toastify';
import { checkoutProduct } from '../services/product_service';
import { useNavigate, useParams } from 'react-router-dom';
import { placeOrder } from '../services/order_service';

const ProductCheckoutForm = () => {
  const calculateDiscountedPrice = (price, discountPercent) => {
    return Math.floor(price - (price * (discountPercent / 100)));
  }
  const { isSingleProductCheckout, id } = useParams();
  const navigate=useNavigate();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1); 
  const token=localStorage.getItem('token'); 
  const [order, setOrder] = useState({
    fullName: "",
    fullAddress: "",
    contactNumber: "",
    alternateContactNumber: "",
    orderProductQuantityList: [{
      productId: id,
      quantity: 1
    }]
  });

  const handleReset = () => {
    setOrder({
      fullName: "",
      fullAddress: "",
      contactNumber: "",
      alternateContactNumber: "",
      orderProductQuantityList: [{
        productId: id,
        quantity: quantity
      }]
    });
    setQuantity(1);  
  };

  const handleChange = (event, property) => {
    const actualValue = event.target.value;
    setOrder({ ...order, [property]: actualValue });
  };
  const handleQuantityChange = (event) => {
    const newQuantity = Number(event.target.value);
    setQuantity(newQuantity);
    setOrder(prevOrder => ({
      ...prevOrder,
      orderProductQuantityList: [{ productId: id, quantity: newQuantity }]
    }));
  };

  // Submit form data
  const handleSubmit = (event) => {
    event.preventDefault();
    if (order.fullName.trim() === '' || order.fullAddress.trim() === '' ||
        order.contactNumber.trim() === '' || order.alternateContactNumber.trim() === '') {
      toast.error("Details Should Not Be Empty");
      return;
    }
    placeOrder(order,token,true);
      
      toast.success("Order has been placed");
      handleReset();
      navigate("/OrderConfirmed")
  };

  useEffect(() => {
    checkoutProduct(isSingleProductCheckout, id,token)
      .then((response) => {
        if (response.length > 0) {
          setProduct(response[0]);
          setOrder(prevOrder => ({
            ...prevOrder,
            orderProductQuantityList: [{
              productId: id,
              quantity: quantity
            }]
          }));
        } 
      })
      .catch(error => {
        console.error("Error fetching product:", error);
      });
  }, [isSingleProductCheckout, id, quantity]);

  return (
    <div>
      <Base />
      <Container>
        <Row className="mt-4">
          <Col sm={{ size: 6, offset: 0 }}>
            <Card outline color="dark">
              <CardHeader className="text-center">
                <h1>Place Your Order</h1>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label for="fullName">Enter Full Name</Label>
                    <Input 
                     autocomplete="off"
                      type="text" 
                      placeholder="Enter Full Name" 
                      id="fullName"
                      value={order.fullName}
                      onChange={(e) => handleChange(e, 'fullName')}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="fullAddress">Full Address</Label>
                    <Input 
                     autocomplete="off"
                      type="text" 
                      placeholder="Enter Full Address" 
                      id="fullAddress"
                      value={order.fullAddress}
                      onChange={(e) => handleChange(e, 'fullAddress')}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="contactNumber">Contact Number</Label>
                    <Input 
                     autocomplete="off"
                      type="text" 
                      placeholder="Enter Contact Number" 
                      id="contactNumber"
                      value={order.contactNumber}
                      onChange={(e) => handleChange(e, 'contactNumber')}
                      maxLength={10}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="alternateContactNumber">Alternate Contact Number</Label>
                    <Input 
                     autocomplete="off"
                      type="text" 
                      placeholder="Enter Alternate Contact Number" 
                      id="alternateContactNumber"
                      value={order.alternateContactNumber}
                      onChange={(e) => handleChange(e, 'alternateContactNumber')}
                      maxLength={10}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="quantity">Quantity</Label>
                    <Input 
                      className='drop-up'
                      type="select" 
                      id="quantity"
                      value={quantity}
                      onChange={handleQuantityChange}
                      
                    >
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                    </Input>
                  </FormGroup>
                  <Container className="text-center">
                    <Button color="dark" type="submit">Pay Now</Button>
                    <Button color="secondary" className="ms-2" onClick={handleReset}>Reset</Button>
                  </Container>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col sm={{ size: 5, offset: 1 }}>
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Amount</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{width:'12vw'}}>{product.name}</td>
                  {product.discountPercent>0?
                  <td>₹{calculateDiscountedPrice(product.price,product.discountPercent)}</td>
                  :<td>₹{product.price}</td>
                  }
                  
                  <td>{quantity}</td>
                  {product.discountPercent>0?
                  <td>₹{calculateDiscountedPrice(product.price,product.discountPercent) * quantity}</td>
                  :<td>₹{product.price * quantity}</td>
                  }
                  
                </tr>
                
                  
                
              </tbody>
            </Table>
            <h3 style={{marginTop:"20px",textAlign:'center'}}>Your Product</h3>
            <Container style={{display:'flex',alignItems:'center',justifyContent:'space-around', borderTop:"1px solid #EBEDF0", borderBottom:"1px solid #EBEDF0" }} >
            <img style={{height:'200px',width:'200px',marginTop:'40px',paddingBottom:"30px"}} src={product.image} alt="" />
            <h5 style={{marginTop:"40px",marginLeft:"50px",paddingBottom:"30px"}}>{product.description}</h5>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductCheckoutForm;

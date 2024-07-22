import React, { useState, useEffect } from 'react';
import { Col, Row, Container, Button, Input, Form, Label, Card, CardBody, CardHeader, FormGroup, Table } from 'reactstrap';
import { toast } from 'react-toastify';
import { checkoutProduct } from '../services/product_service';
import { useNavigate, useParams } from 'react-router-dom';
import { placeOrder } from '../services/order_service';

const MyCartCheckOutForm = () => {
  const calculateDiscountedPrice = (price, discountPercent) => {
    return Math.floor(price - (price * (discountPercent / 100)));
  }
  const { isSingleProductCheckout, id } = useParams();
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [order, setOrder] = useState({
    fullName: "",
    fullAddress: "",
    contactNumber: "",
    alternateContactNumber: "",
    orderProductQuantityList: []
  });

  const handleReset = () => {
    setOrder({
      fullName: "",
      fullAddress: "",
      contactNumber: "",
      alternateContactNumber: "",
      orderProductQuantityList: []
    });
    setQuantities(products.reduce((acc, product) => ({ ...acc, [product.id]: 1 }), {}));
  };

  const handleChange = (event, property) => {
    const actualValue = event.target.value;
    setOrder({ ...order, [property]: actualValue });
  };

  const handleQuantityChange = (productId, newQuantity) => {
    setQuantities(prevQuantities => ({ ...prevQuantities, [productId]: newQuantity }));
    setOrder(prevOrder => ({
      ...prevOrder,
      orderProductQuantityList: prevOrder.orderProductQuantityList.map(item =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      )
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (order.fullName.trim() === '' || order.fullAddress.trim() === '' ||
      order.contactNumber.trim() === '' || order.alternateContactNumber.trim() === '') {
      toast.error("Details Should Not Be Empty");
      return;
    }
    placeOrder(order, token, false)
      .then(() => {
        toast.success("Order has been placed");
        handleReset();
        navigate("/OrderConfirmed");
      })
      .catch(error => {
        console.error("Error placing order:", error);
        toast.error("Error placing order");
      });
  };

  useEffect(() => {
    checkoutProduct(isSingleProductCheckout, id, token)
      .then((response) => {
        if (response.length > 0) {
          setProducts(response);
          setQuantities(response.reduce((acc, product) => ({ ...acc, [product.id]: 1 }), {}));
          setOrder(prevOrder => ({
            ...prevOrder,
            orderProductQuantityList: response.map(product => ({
              productId: product.id,
              quantity: 1
            }))
          }));
        }
      })
      .catch(error => {
        console.error("Error fetching product:", error);
      });
  }, [isSingleProductCheckout, id]);

  const grandTotal = products.reduce((total, product) => {
    const price = product.discountPercent ? calculateDiscountedPrice(product.price, product.discountPercent) : product.price;
    return total + price * (quantities[product.id] || 1);
  }, 0);

  return (
    <div>
      <Container>
        <Row className="mt-4">
          <Col sm={{ size: 6, offset: 0 }}>
            <Card outline color="dark" style={{ position: 'fixed' }}>
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
                {products.map((product, index) => (
                  <tr key={index}>
                    <td style={{ width: '12vw' }}>{product.name}</td>
                    <td>₹{product.discountPercent ? calculateDiscountedPrice(product.price, product.discountPercent) : product.price}</td>
                    <td>
                      <select
                        value={quantities[product.id] || 1}
                        onChange={(e) => handleQuantityChange(product.id, Number(e.target.value))}
                        style={{ border: 'none', outline: 'none' }}
                      >
                        {[1, 2, 3].map(qty => (
                          <option key={qty} value={qty}>{qty}</option>
                        ))}
                      </select>
                    </td>
                    <td>₹{(product.discountPercent ? calculateDiscountedPrice(product.price, product.discountPercent) : product.price) * (quantities[product.id] || 1)}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="2"></td>
                  <td style={{ fontWeight: '700' }}>Grand Total</td>
                  <td>₹{grandTotal}</td>
                </tr>
              </tbody>
            </Table>
            <h3 style={{ marginTop: "20px", textAlign: 'center' }}>Your Products</h3>
            {products.map((product, index) => (
              <Container key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', borderTop: "1px solid #EBEDF0", borderBottom: "1px solid #EBEDF0" }}>
                <img style={{ height: '200px', width: '200px', marginTop: '40px', paddingBottom: "30px" }} src={product.image} alt="" />
                <h5 style={{ marginTop: "40px", marginLeft: "50px", paddingBottom: "30px" }}>{product.description}</h5>
              </Container>
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MyCartCheckOutForm;

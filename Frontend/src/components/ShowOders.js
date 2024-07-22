import React, { useEffect, useState } from 'react';
import { Col, Row, Card, CardHeader, CardBody, Table, Button } from 'reactstrap';
import { getOrder } from '../services/order_service';
import { useParams } from 'react-router-dom';

const ShowOrders = () => {
    const calculateDiscountedPrice = (price, discountPercent) => {
        return Math.floor(price - (price * (discountPercent / 100)));
      }
    const [orders, setOrders] = useState([]);
    const { id } = useParams();
    const [selectedProductId, setSelectedProductId] = useState(null);
    

    useEffect(() => {
        getOrder(id).then((response) => {
            setOrders(response);
            console.log(response);
        }).catch((error) => {
            console.error('Error fetching orders:', error);
        });
    }, [id]);

    const handleProduct = (orderId) => {
        setSelectedProductId(orderId === selectedProductId ? null : orderId);
        
    };

    return (
        <div className='mt-5 overflow-hidden'>
            {orders.length > 0 ?
                <Row>
                    <Col sm={{ size: 10, offset: 1 }}>
                        <Card>
                            <CardHeader className='text-center' style={{ fontSize: '2vw', fontWeight: '700' }}>My Orders</CardHeader>
                            <CardBody>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Order ID</th>
                                            <th>Full Name</th>
                                            <th>Address</th>
                                            <th>Contact Number</th>
                                            <th>Alternate Contact Number</th>
                                            <th>Total Amount</th>
                                            <th>Status</th>
                                            <th>View Order</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map((order, index) => (
                                            <React.Fragment key={index}>
                                                <tr>
                                                    <td>{order.id}</td>
                                                    <td>{order.orderFullName}</td>
                                                    <td>{order.orderFullOrder}</td>
                                                    <td>{order.orderContactNumber}</td>
                                                    <td>{order.orderAlternateContactNumber}</td>

                                                    <td>₹{order.orderAmount}</td>
                                                    <td>{order.orderStatus}</td>
                                                    <td><Button onClick={() => handleProduct(order.id)}>{selectedProductId === order.id ? "Hide Order" : "Show Order"}</Button></td>
                                                </tr>
                                                {selectedProductId === order.id && (
                                                    <tr>
                                                        <td colSpan="8">
                                                            <Card>
                                                               <CardHeader style={{fontWeight:'400'}}>{order.product.name}</CardHeader>
                                                               <CardBody style={{display:'flex', gap:'2vw'}}>

                                                                <img style={{height:'200px', width:'200px'}} src={order.product.image} alt="" />
                                                                <div>
                                                                <h6 style={{fontSize:'1.5vw'}}>{order.product.description}</h6>
                                                                {order.product.discountPercent>0?
                                                                <h5 className='mt-5'>₹{calculateDiscountedPrice(order.product.price,order.product.discountPercent)}/-</h5>
                                                                :<h5 className='mt-5'>₹{order.product.price}/-</h5>}
                                                                
                                                                </div>
                                                                
                                                                
                                                               </CardBody>
                                                                
                                                            </Card>
                                                        </td>
                                                    </tr>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                : "You have not ordered yet"}
        </div>
    );
}

export default ShowOrders;

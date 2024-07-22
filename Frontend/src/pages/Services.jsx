import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import Base from "../components/Base";

const Services=()=>{
    return(
        <div className="overflow-hidden">
            <Base/>
            <Row>
                <Col sm={{size:10, offset:1,}}>
                <Card className="mt-4">
                <CardHeader style={{fontSize:'2vw', textAlign:'center', fontWeight:'900'}}>
                    Free shipping on all orders
                </CardHeader>
                <CardBody style={{display:'flex',gap:'2vw'}}>
               
                <img style={{height:'200px' , width:'200px', borderRadius:'50%'}} src="https://s4u4z9w2.rocketcdn.me/wp-content/uploads/2023/04/Apply-WooCommerce-Free-Shipping-Over-A-Condition.png" alt="" />
               <h2 className="mt-5">Enjoy free shipping on all your orders, no minimum purchase required. Shop now and take advantage of this limited-time offer!</h2> 
                </CardBody>
                
                </Card>
                <Card className="mt-4">
                <CardHeader style={{fontSize:'2vw', textAlign:'center', fontWeight:'900'}}>
                    24/7 Customer Support
                </CardHeader>
                <CardBody style={{display:'flex',gap:'2vw'}}>
               
                <img style={{height:'200px' , width:'200px', borderRadius:'50%'}} src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/24-7-services-logo-design-template-abd47f9c8c3f6509ede5e9a70dd124e3_screen.jpg?ts=1698341915" alt="" />
               <h2 className="mt-5">We are here to help you around the clock. Our customer support team is available 24/7 to assist you with any queries or issues.</h2> 
                </CardBody>
                
                </Card>
                <Card className="mt-4">
                <CardHeader style={{fontSize:'2vw', textAlign:'center', fontWeight:'900'}}>
                Hassle-Free Returns
                </CardHeader>
                <CardBody style={{display:'flex',gap:'2vw'}}>
               
                <img style={{height:'200px' , width:'200px', borderRadius:'50%'}} src="https://cdn11.bigcommerce.com/s-xt5en0q8kf/content/pages/return-policy/images/moat-hassle-free-returns.jpg" alt="" />
               <h2 className="mt-5">If you are not completely satisfied with your purchase, you can return it within 30 days for a full refund.</h2> 
                </CardBody>
                
                </Card>
                <Card className="mt-4">
                <CardHeader style={{fontSize:'2vw', textAlign:'center', fontWeight:'900'}}>
                Secure Packaging
                </CardHeader>
                <CardBody style={{display:'flex',gap:'2vw'}}>
               
                <img style={{height:'200px' , width:'200px', borderRadius:'50%'}} src="https://png.pngtree.com/png-vector/20191027/ourmid/pngtree-package-icon-for-your-project-png-image_1877302.jpg" alt="" />
               <h2 className="mt-5">We ensure that all products are securely packaged to prevent any damage during transit</h2> 
                </CardBody>
                
                </Card>
                </Col>
            </Row>
            
            
        </div>
        
    )

}
export default Services;
import React from 'react'
import { Card, CardBody, Row,Col, CardHeader, CardFooter } from 'reactstrap'
import Base from '../components/Base';

const QuerySubmitted=()=> {
  return (
    <div className='overflow-hidden'>
        <Base/>
        <Row className=' mt-4'>
            <Col sm={{ size: 6, offset: 1 }}>
                <Card style={{width:'70rem'}}>
                    <CardHeader style={{fontSize:'2vw',textAlign:'center'}}>
                        Your Query has been successfully submitted. You will get the response in 24 hours.
                    </CardHeader>
                    
                    <img style={{height:'300px',width:'300px',position:'relative',left:'50%',transform:'translate(-50%)'}} src="https://st3.depositphotos.com/4429641/37615/v/450/depositphotos_376152850-stock-illustration-check-mark-icons-flat-buttons.jpg" alt="" />
                    <CardFooter style={{fontSize:'2vw', textAlign:'center'}}>
                        Thank you For Trusting Dropify
                    </CardFooter>
                </Card>
            </Col>
        </Row>
    </div>
  )
}

export default QuerySubmitted;
import React, { useEffect, useState } from 'react';
import Base from '../../components/Base';

import { Card, CardBody, Col, Container, Row, Table } from 'reactstrap';

import { useParams } from 'react-router-dom';
import { getUser } from '../../services/user_service';


const ProfileInfo = () => {
    const [user, setUser] = useState(null);
    const {id} = useParams();

    useEffect(() => {
        getUser(id).then((data) => {
            setUser({...data});
        });
    }, []);
    if(user){
        console.log(user)
    }
    if (!user) {
        return <div>Loading...</div>; // or render a loading spinner
    }

    return (
        
        <div className='overflow-hidden'>
            
            <Base />
            <Row className="mt-5">
                <Col md={{ size: 8, offset: 2 }}>
                    <Card >
                        <CardBody>
                            <Container className='text-center'>
                                <img
                                    className='img-fluid rounded-circle'
                                    style={{ maxWidth: '150px', maxHeight: '150px' }}
                                    src="https://static.vecteezy.com/system/resources/previews/006/231/547/original/vintage-retro-style-alphabet-letter-d-logo-with-uppercase-font-template-element-vector.jpg"
                                    alt="Profile Picture"
                                />
                            </Container>
                            <Container className='text-center mt-3 mb-3'>
                                <h1>Welcome, {user.username}</h1>
                            </Container>
                            <Table hover bordered={true} className='mt-10px'>
                                <tbody className='text-center'>
                                    <tr>
                                        <td>DROPIFYID</td>
                                        <td>DROPIFY{user.id}</td>
                                    </tr>
                                    <tr>
                                        <td>NAME</td>
                                        <td>{user.name}</td>
                                    </tr>
                                    <tr>
                                        <td>EMAIL ID</td>
                                        <td>{user.email}</td>
                                    </tr>
                                    <tr>
                                        <td>USERNAME</td>
                                        <td>{user.username}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            
        </div>
    );
};

export default ProfileInfo;
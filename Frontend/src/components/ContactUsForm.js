import React, { useState } from 'react';
import { Row, Card, CardBody, CardHeader, Col, Form, Label, Input, FormGroup, Button, Container } from 'reactstrap';
import { addQuery } from '../services/contactus_service';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ContactUsForm = () => {
    const navigate=useNavigate();
    const [userInfo, setUserInfo] = useState({
        username: "",
        contactInfo: "",
        query: "",
        queryImg: null, 
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const formData = new FormData();
        formData.append('username', userInfo.username);
        formData.append('contactInfo', userInfo.contactInfo);
        formData.append('query', userInfo.query);
        
        if (userInfo.queryImg) {
            formData.append('queryImg', userInfo.queryImg);
        }
        
        try {
            await addQuery(formData);
            toast.success('Query submitted successfully');
            handleReset(); 
            navigate('/querySubmitted')
        } catch (error) {
            console.error('Error submitting query:', error);
            toast.error('Failed to submit query. Please try again.');
        }
    };

    const handleChange = (e, field) => {
        if (field === 'file') {
            const file = e.target.files[0];
            if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
                setUserInfo(prevState => ({
                    ...prevState,
                    queryImg: file
                }));
            } else {
                setUserInfo(prevState => ({
                    ...prevState,
                    queryImg: null
                }));
                toast.error('Please upload a PNG or JPEG file.');
            }
        } else {
            setUserInfo(prevState => ({
                ...prevState,
                [field]: e.target.value
            }));
        }
    };

    const handleReset = () => {
        setUserInfo({
            username: "",
            contactInfo: "",
            query: "",
            queryImg: null,
        });
        document.getElementById('file').value = '';
    };

    return (
        <div>
            <Row>
                <Col sm={{ size: 6, offset: 3 }}>
                    <Card className='mt-4'>
                        <CardHeader style={{ textAlign: 'center', fontSize: '2.5vw' }}>
                            Contact Us
                        </CardHeader>
                        <CardBody>
                            <Form onSubmit={handleSubmit} encType="multipart/form-data">
                                <FormGroup>
                                    <Label for="username">Enter your Username or Email</Label>
                                    <Input
                                     autocomplete="off"
                                        placeholder='Enter your Username or Email'
                                        type='text'
                                        value={userInfo.username}
                                        onChange={(e) => handleChange(e, 'username')}
                                        id='username'
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="contactInfo">Enter your Contact Number</Label>
                                    <Input
                                     autocomplete="off"
                                        placeholder='Enter your Contact Number'
                                        type='text'
                                        value={userInfo.contactInfo}
                                        onChange={(e) => handleChange(e, 'contactInfo')}
                                        id='contactInfo'
                                        maxLength={10}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="query">Enter your Query</Label>
                                    <Input
                                     autocomplete="off"
                                        placeholder='Enter your Query'
                                        type='textarea'
                                        id='query'
                                        value={userInfo.query}
                                        onChange={(e) => handleChange(e, 'query')}
                                        style={{
                                            height: '150px',
                                            resize: 'none'
                                        }}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="file">Attach a screenshot of the query</Label>
                                    <Input
                                        type='file'
                                        id='file'
                                        onChange={(e) => handleChange(e, 'file')}
                                    />
                                </FormGroup>
                                <Container className='text-center'>
                                    <Button color='dark' type="submit">Submit</Button>
                                    <Button color='secondary' className='ms-2' onClick={handleReset}>Reset</Button>
                                </Container>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default ContactUsForm;

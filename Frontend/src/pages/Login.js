import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Base from "../components/Base";
import { useState } from "react";
import { toast } from "react-toastify";
import { loginUser } from "../services/user_service";
import { doLogin } from "../auth";
import { useNavigate } from "react-router-dom";
const Login=()=>{
    const navigate=useNavigate()
    const[loginDetail,setLoginDetail]=useState({
        username:"",
        password:""
    });
    const handleChange=(event,property)=>{
        let actualValue=event.target.value;
        setLoginDetail({...loginDetail,[property]:actualValue})
    }
    const handleSubmit=(event)=>{
        event.preventDefault();
        if(loginDetail.username.trim()==='' || loginDetail.password.trim()===''){
            toast.error("Username or Password is required");
            return;
        }

        loginUser(loginDetail).then((data)=>{
            toast.success("Login Successful");
            localStorage.setItem('token', data.token);
            
            doLogin(data,()=>{
                console.log("login detail is saved to local storage")
                navigate('/');
            })
            

        }).catch((error)=>{
            console.log(error);
            toast.error("Something went wrong");
        })
    }
    const handleReset=()=>{
        setLoginDetail({
            username:"",
            password:""
        })
    }
    return (
        <div>
            <Base/>
            <Container>
           <Row className="mt-4">
            <Col sm={{size:6, offset:3}}>
            <Card outline color="dark">
                <CardHeader className="text-center">
                    <h1>Login Credentials</h1>
                </CardHeader>
                <CardBody>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="username"> Enter Username or Email</Label>
                            <Input 
                            autocomplete="off"
                            type="text" 
                            placeholder="Enter Username or Email" 
                            id="username"
                            value={loginDetail.username}
                            onChange={(e)=>handleChange(e,'username')}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password"> Enter Password</Label>
                            <Input 
                            type="password" 
                            placeholder="Enter Password" 
                            id="password"
                            value={loginDetail.password}
                            onChange={(e)=>handleChange(e,'password')}/>
                        </FormGroup>
                        <Container className="text-center">
                            <Button color="dark">Login</Button>
                            <Button color="secondary" className="ms-2" onClick={handleReset}>Reset</Button>
                        </Container>
                    </Form>
                </CardBody>
            </Card>
            </Col>
           </Row>
           </Container>
        </div>
    )
}
export default Login;
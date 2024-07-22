import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row } from "reactstrap";
import Base from "../components/Base";
import { useState } from "react";
import { signUp } from "../services/user_service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        username: "",
        password: ""
    });
    const navigate=useNavigate()
    const [error, setError] = useState({
        errors: {},
        isError: false
    });

    const handleChange = (event, property) => {
        setData({ ...data, [property]: event.target.value });
    };

    const resetData = () => {
        setData({
            name: "",
            email: "",
            username: "",
            password: ""
        });
        setError({
            errors: {},
            isError: false
        });
    };

    const submitForm = (event) => {
        event.preventDefault();

        let validationErrors = {};
        let hasError = false;

        if (!data.name) {
            validationErrors.name = "Name is required";
            hasError = true;
        }
        if (!data.email) {
            validationErrors.email = "Email is required";
            hasError = true;
        }
        if (!data.username) {
            validationErrors.username = "Username is required";
            hasError = true;
        }
        if (!data.password) {
            validationErrors.password = "Password is required";
            hasError = true;
        }

        if (hasError) {
            setError({ errors: validationErrors, isError: true });
            toast.error("Please fill all the fields");
            return;
        }

        signUp(data).then((resp) => {
            console.log(resp);
            console.log("Success");
            toast.success("User Registration Successful");
            resetData();
            navigate("/login")
        }).catch((error) => {
            console.log(error);
            setError({
                errors: error.response.data,
                isError: true,
            });
        });
    };

    return (
        <div>
            <Base />
            <Container>
                <Row className="mt-4">
                    <Col sm={{ size: 6, offset: 3 }}>
                        <Card outline color="dark">
                            <CardHeader className="text-center">
                                <h1>Fill Information To Register</h1>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={submitForm}>
                                    {/* Name field */}
                                    <FormGroup>
                                        <Label for="name">Enter Name</Label>
                                        <Input
                                            autocomplete="off"
                                            type="text"
                                            placeholder="Enter Your Name"
                                            id="name"
                                            onChange={(e) => handleChange(e, 'name')}
                                            value={data.name}
                                            invalid={error.errors.name ? true : false}
                                        />
                                        <FormFeedback>
                                            {error.errors.name}
                                            </FormFeedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="email">Enter Email</Label>
                                        <Input
                                            type="email"
                                             autocomplete="off"
                                            placeholder="Enter Your Email"
                                            id="email"
                                            onChange={(e) => handleChange(e, 'email')}
                                            value={data.email.toLocaleLowerCase()}
                                            invalid={error.errors.email ? true : false}
                                        />
                                         <FormFeedback>
                                            {error.errors.email}
                                            </FormFeedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="username">Enter Username</Label>
                                        <Input
                                            type="text"
                                             autocomplete="off"
                                            placeholder="Enter Your Username"
                                            id="username"
                                            
                                            onChange={(e) => handleChange(e, 'username')}
                                            value={data.username.toLocaleLowerCase()}
                                            invalid={error.errors.username ? true : false}
                                        />
                                         <FormFeedback>
                                            {error.errors.username}
                                            </FormFeedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="password">Enter Password</Label>
                                        <Input
                                            type="password"
                                            placeholder="Enter Your Password"
                                            id="password"
                                            onChange={(e) => handleChange(e, 'password')}
                                            value={data.password}
                                            invalid={error.errors.password ? true : false}
                                        />
                                         <FormFeedback>
                                            {error.errors.password}
                                            </FormFeedback>
                                    </FormGroup>
                                    <Container className="text-center">
                                        <Button color="dark">Register</Button>
                                        <Button onClick={resetData} color="secondary" className="ms-2" type="reset">Reset</Button>
                                    </Container>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Signup;

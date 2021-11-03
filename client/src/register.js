import React, {useState} from 'react';
import {Button, Card, Form, Row, Alert} from 'react-bootstrap';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './register.css'
import { useHistory } from 'react-router-dom';

export default function Register() {
    const [mail, setMail] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    Axios.defaults.withCredentials = true;
    
    const onSubmit = () => {
        Axios.post('http://localhost:9001/register', {
            mail: mail,
            pass: pass
        }).then((response) => {
            if (response.data.message === 'success'){
                
                setError(response.data.message);
                history.push('/');
                   
            }
            else {
                setError(response.data.message);
            }
        });
    };
    return(
            <Card>
                <Card.Img src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png' alt = 'card img' className = 'image'/>
                <Card.Body>
                    {(error !== '') &&
                        <Alert variant = 'danger'>{error}</Alert>
                        
                    }
                    <Form>
                        <Row className = 'm-3'>
                            <Form.Group>
                                <Form.Label>Enter Email Address: </Form.Label>
                                <Form.Control
                                    type = 'email'
                                    name = 'email'
                                    placeholder = 'Email address' 
                                    value = {mail}
                                    onChange = {(e) => setMail(e.target.value)}
                                    required = {true}
                                />
                            </Form.Group>
                        </Row>
                        <Row className = 'm-3'>
                            <Form.Group>
                                <Form.Label>Enter password: </Form.Label>
                                <Form.Control
                                    type = 'password'
                                    name = 'password'
                                    placeholder = 'Password' 
                                    value = {pass}
                                    onChange = {(e) => setPass(e.target.value)}
                                    required
                                />
                            </Form.Group>
                        </Row>
                        <Row className="m-3">
                            <Form.Group>
                                <Form.Label>Repeat password: </Form.Label>
                                <Form.Control
                                    type = 'password'
                                    placeholder = 'Repeat password' 
                                    onChange = {(e) => {
                                        if(pass !== e.target.value){
                                            setError('Passwords do no not match');
                                        }
                                        else {
                                            setError('');
                                        }
                                        
                                        
                                    }}
                                />
                            </Form.Group>
                        </Row>
                        
                        
                        <Button
                            className = 'register-button'
                            onClick = {onSubmit}
                        >
                            Register
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        
    )
}
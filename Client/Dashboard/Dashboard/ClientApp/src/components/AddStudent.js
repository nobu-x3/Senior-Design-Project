import React from 'react';
import { useHistory } from 'react-router-dom';
import {Button, Form, FormControl, Row, Col} from 'react-bootstrap';
import axios from 'axios';

const handleSubmit = (event) =>
{
    event.preventDefault();
    const student = { 
        FirstName:event.target.FirstName.value,
        LastName:event.target.LastName.value,
        StudentID:event.target.StudentID.value
    }
    fetch("https://localhost:7113/api/Dashboard",
        {
            method: 'POST',
            headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            body: JSON.stringify(student)
            }
        )
        .then((result) =>
            {
                if(result.ok)
                    alert('Success!');
            }, 
            (error) =>
            {
                alert('Failed!');
            })
}

const AddStudent = () =>
{
    const history = useHistory();
    return(
        <div className='container'>
            <Row>
                <Col sm={6}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId='FirstName'>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type='text' name='FirstName' required
                                          placeholder='John' />
                        </Form.Group>
                        <Form.Group controlId='LastName'>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type='text' name='LastName' required
                                          placeholder='Doe' />
                        </Form.Group>
                        <Form.Group controlId='StudentID'>
                            <Form.Label>Student ID</Form.Label>
                            <Form.Control type='text' name='StudentID' required
                                          placeholder='123456' />
                        </Form.Group>
                        <Form.Group>
                            <Button variant='primary' type='submit'>Add Student</Button>
                            <Button variant='secondary' onClick={()=>history.push('/dashboard')}>Cancel</Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default AddStudent;
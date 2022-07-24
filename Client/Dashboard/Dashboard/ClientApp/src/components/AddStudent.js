import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import {Button, Form, FormControl, Row, Col} from 'react-bootstrap';
import axios from 'axios';

const AddStudent = () =>
{
    const [file, setFile] = useState(null);
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [id, setId] = useState('');
    const history = useHistory();
    const handleSubmit = (event) =>
    {
        
        // fetch("https://localhost:7113/api/Dashboard",
        //     {
        //         method: 'POST',
        //         headers:
        //             {
        //                 'Accept': 'application/json',
        //                 'Content-Type': 'application/json'
        //             },
        //         body: JSON.stringify(student)
        //     }
        // )

        event.preventDefault();
        const formData = new FormData();
        formData.append('StudentID', id);
        formData.append('FirstName', fname);
        formData.append('LastName', lname);
        formData.append('BaseImage', file);
        axios.post('https://localhost:7113/api/Dashboard', formData)
            .then(result =>
                {
                    if(result.ok)
                        alert('Success!');
                    resetForm();
                },
                (error) =>
                {
                    alert('Failed!');
                    resetForm();
                });
        
    }
    
    const resetForm = () =>
    {
        setFname('');
        setLname('');
        setId('');
        setFile(null);
        document.getElementById('formFile').value = null;
    }
    
    return(
        <div className='container'>
            <Row>
                <Col sm={6}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId='FirstName'>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type='text' name='FirstName' required value={fname}
                                          placeholder='John' onChange={(e) => setFname(e.target.value)}/>
                        </Form.Group>
                        <Form.Group controlId='LastName'>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type='text' name='LastName' required value={lname}
                                          placeholder='Doe' onChange={(e) => setLname(e.target.value)}/>
                        </Form.Group>
                        <Form.Group controlId='StudentID'>
                            <Form.Label>Student ID</Form.Label>
                            <Form.Control type='text' name='StudentID' required value={id}
                                          placeholder='123456' onChange={(e) => setId(e.target.value)}/>
                        </Form.Group>
                        <Form.Group controlId="formFile" className="mb-3" onChange={(e) => setFile(e.target.files[0])}>
                            <Form.Label>Base Image</Form.Label>
                            <Form.Control type="file" accept='image/*' />
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
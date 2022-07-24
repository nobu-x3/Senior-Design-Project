import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

const Dashboard = (props) =>
{
    const [state, setState] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [loadSave, setLoadSave] = useState(false);
    const [showWaitMessage, setShowWaitMessage] = useState(false);
    const [file, setFile] = useState(null);
    const history = useHistory();
    useEffect(() =>
    {
        axios.get('https://localhost:7113/api/Dashboard').then(res =>
        {
            console.log(res);
            setState(res.data);
        });
        return  () => setState([]);
    }, [state]);
    const handleSave = () =>
    {
        window.open('https://localhost:7113/api/Dashboard/sessionSave', '_blank');
    }
    
    const handleCompileRequest = () =>
    {
        setLoading(true);
        setShowWaitMessage(true);
        setTimeout(() => 
        {
            setLoading(false);
            setShowWaitMessage(false);
            window.open('https://localhost:7113/api/Dashboard/downloadCompiledExecutables', '_blank');
        }, 5000);
        // axios.get('https://localhost:7113/api/Dashboard/compileExecutables')
        //     .then(res =>
        //     {
        //         setLoading(false);
        //         setShowWaitMessage(false);
        //     });
    }
    
    const handleSubmitFile = (event) =>
    {
        setLoading(true);
        const formData = new FormData();
        formData.append('File', file);
        axios.post('https://localhost:7113/api/Dashboard/sessionLoad',
            formData)
            .then(res =>
            {
                setLoading(false);
            });
    }
    const handleSessionStart = () =>
    {
        setLoading(true)
        axios.get('https://localhost:7113/api/Dashboard/startSession')
            .then(res =>
            {
               setLoading(false); 
            });
    }
    
    return(
        <div>
            {isLoading ?
            <div>
                {showWaitMessage ? 
                    <Alert key={'primary'} variant='primary'>This may take up to 2 hours, please do not reload or leave the page, it is not frozen.</Alert>
                    : null}
                <LoadingSpinner />
            </div>    
                :
                <div>
                    <Button variant='primary' onClick={() => history.push('/add-student')}>Add Student</Button>
                    <Button variant='primary' onClick={handleSave}>Save</Button>
                    <Button variant='primary' onClick={handleCompileRequest}>Compile Client Executables</Button>
                    <Button variant='success' onClick={handleSessionStart}>Start Session</Button>
                    {loadSave ? 
                        <div>
                            <Form.Group controlId="formFile" className="mb-3" onChange={(e) => setFile(e.target.files[0])}>
                                <Form.Control type="file" />
                            </Form.Group>
                            <Button variant='primary' onClick={handleSubmitFile}>Upload</Button>
                        </div>
                        : 
                        <Button variant='primary' onClick={() => setLoadSave(true)}>Load Save</Button>}
                    <RenderTable state={state}/>
                </div>
            
            }

        </div>
    )
}

const handleDelete = (id) =>
{
    axios.delete('https://localhost:7113/api/Dashboard/' + id)
        .then(res =>
        {
            alert('Deleted id: ' + id);  
        });
}
function RenderTable(props)
{
    // let test = 
    // [
    //     {
    //         "id": 1,
    //         "studentID": "302155",
    //         "firstName": "Dominik",
    //         "lastName": "Kurasbediani"
    //     }
    // ]

    let rows = [];
    props.state.forEach(student => {
        const status = student.status.toString()
        rows.push(
            <tr>
                <td>
                    <Button variant='danger' onClick={() => handleDelete(student.id)}>Delete</Button>
                </td>
                <td>{student.id}</td>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.studentID}</td>
                <td>{status}</td>
                <td>{student.lastUpdate}</td>
            </tr>
        
        )
    })
    return(
        <div>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Delete</th>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Student ID</th>
                    <th>Status</th>
                    <th>Last Update</th>
                </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </Table>
        </div>
    )
}
export default Dashboard;
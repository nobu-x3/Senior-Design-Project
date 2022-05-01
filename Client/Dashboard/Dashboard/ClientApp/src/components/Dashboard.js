import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Dropdown, SplitButton, Table } from 'react-bootstrap';
import axios from 'axios';
const Dashboard = (props) =>
{
    const [state, setState] = useState([]);
    const history = useHistory();
    useEffect(() =>
    {{
        axios.get('https://localhost:7113/api/Dashboard').then(res =>
        {
            console.log(res);
            setState(res.data);
        });
    }}, []);
    
    return(
        <div>
            <Button variant='primary' onClick={()=>history.push('/add-student')}>Add Student</Button>
            <RenderTable state={state}/>
        </div>
    )
}

function RenderTable(props)
{
    let test = 
    [
        {
            "id": 1,
            "studentID": "302155",
            "firstName": "Dominik",
            "lastName": "Kurasbediani"
        }
    ]

    let rows = [];
    props.state.forEach(student => rows.push(
    <tr>
        <td>{student.id}</td>
        <td>{student.firstName}</td>
        <td>{student.lastName}</td>
        <td>{student.studentID}</td>
    </tr>
        
    ))
    return(
        <div>
            <Table striped bordered hover>
                <thead>
                <tr>
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
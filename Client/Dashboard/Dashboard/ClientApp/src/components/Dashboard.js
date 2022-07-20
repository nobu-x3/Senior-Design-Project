import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import axios from 'axios';



const Dashboard = (props) =>
{
    const [state, setState] = useState([]);
    const history = useHistory();
    useEffect(() =>
    {
        axios.get('https://localhost:7113/api/Dashboard').then(res =>
        {
            console.log(res);
            setState(res.data);
        });
    }, [state]);
    
    return(
        <div>
            <Button variant='primary' onClick={()=>history.push('/add-student')}>Add Student</Button>
            <RenderTable state={state}/>
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
    const [loading, setLoading] = useState(true);
    // let test = 
    // [
    //     {
    //         "id": 1,
    //         "studentID": "302155",
    //         "firstName": "Dominik",
    //         "lastName": "Kurasbediani"
    //     }
    // ]
    const handleSave = () =>
    {
        alert("Saving has began");
        setLoading(true);
        axios.post('https://localhost:7113/api/Dashboard/sessionSave')
            .then(res =>
            {
                setLoading(false);
            });
    }
    let rows = [];
    props.state.forEach(student => {
        const status = student.status.toString()
        rows.push(
            <tr>
                <td>
                    <Button variant='danger' onClick={() => handleDelete(student.id)} disabled={!loading}>Delete</Button>
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
            <Button variant='primary' onClick={handleSave} disabled={!loading}>Save</Button>
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
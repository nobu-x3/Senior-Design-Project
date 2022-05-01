import React, { useEffect, useState } from 'react';
import { Button, Dropdown, SplitButton, Table } from 'react-bootstrap';

const Dashboard = (props) =>
{
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
            </Table>
        </div>
    )
}

export default Dashboard;
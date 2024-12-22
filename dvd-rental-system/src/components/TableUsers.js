import React, { useState } from 'react';
import Table from 'react-bootstrap/Table'

const TableUsers = (props = null) => {
    if(!props.users) return <div> There is no users.</div>
   return (
        <>
            <Table stripped  hover size="lg">
                <thead>
                <tr>
                    <th width="270">User Name</th>
                    <th width="470">Email</th>
                    <th width="170">18+</th>
                    <th width="270">Borrowed Movies</th>
                    <th width="270">Rented Movies</th>
                </tr>
                </thead>
                <tbody>
                {props.users.map((item) =>
                <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.age? 'True': 'False'}</td>
                    <td>{item.borrowed}</td>
                    <td>{item.rented}</td>
                </tr>
                )}
                </tbody>
            </Table>
                </>
    );
};

export default TableUsers
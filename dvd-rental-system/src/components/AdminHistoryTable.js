import React, { useState } from 'react';
import TableUsers from "./TableUsers";
import Table from 'react-bootstrap/Table'

const UserHistoryTable = (props = null) => {
    if(!props.histories) return <div> There is not exist data.</div>;
   return (
        <>
            <Table stripped  hover size="lg">
                <thead>
                <tr>
                    <th width="270">User Name</th>
                    <th width="270">Movie Name</th>
                    <th width="170">Start Date</th>
                    <th width="170">End Date</th>
                </tr>
                </thead>
                <tbody>
                {props.histories.map((hishory) =>
                <tr key={hishory.id}>
                    <td>{hishory.user.name}</td>
                    <td>{hishory.movie.title}</td>
                    <td>{hishory.dateStarted}</td>
                    <td>{hishory.dateReturned? hishory.dateReturned: "-"}</td>
                </tr>
                )}
                </tbody>
            </Table>
        </>
    );
};

export default UserHistoryTable
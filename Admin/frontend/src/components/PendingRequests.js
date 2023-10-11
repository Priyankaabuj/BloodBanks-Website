import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PendingRequests() {
    const [pendingRequests, setPendingRequests] = useState([]);

    useEffect(() => {
        // Fetch pending requests from the backend
        axios.get('/api/admin/pending-requests')
            .then(response => setPendingRequests(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleApprove = (id) => {
        // Send approval request to the backend
        axios.put(`/api/admin/approve-request/${id}`)
            .then(response => {
                // Remove the approved request from the state
                setPendingRequests(pendingRequests.filter(request => request._id !== id));
            })
            .catch(error => console.error(error));
    };

    return (
        <div>
            <h2>Pending Requests</h2>
            <ul>
                {pendingRequests.map(request => (
                    <li key={request._id}>
                        <strong>Name:</strong> {request.name}
                        <button onClick={() => handleApprove(request._id)}>Approve</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PendingRequests;

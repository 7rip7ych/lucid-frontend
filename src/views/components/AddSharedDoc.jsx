import React, { useState, useEffect } from 'react';
import shareDoc from '../models/shareDoc.jsx';
import auth from '../models/auth.jsx';
import { useNavigate } from 'react-router-dom';

function AddSharedDoc () {
    const [documentId, setDocumentId] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    async function handleAddDoc(event) {
        event.preventDefault();

        const data = {
            owner: auth.userId,
            id: documentId
        }

        const result = await shareDoc.sharedDoc(data);

        if(result.error) {
            setMessage(<p style={{ color: 'red' }}>Error</p>);
            setTimeout(setMessage(''), 5000);
        }

        // window.location.reload(false);
        navigate('/lucid-frontend/', { replace: true });
        setDocumentId('');
    }

    return (
        <div className='add-share-doc'>
        <form onSubmit={handleAddDoc}>
        <label>Lägg till dokument: </label>
        <input className='textarea'
                type="text"
                value={documentId}
                placeholder='Id'
                onChange={(e) => setDocumentId(e.target.value)}
        />
        <input className="login-button" type="submit" value="Lägg till"/>
        </form>
        {message}
        </div>
    )
}

export default AddSharedDoc;

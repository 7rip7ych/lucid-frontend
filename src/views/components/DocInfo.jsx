import { useState } from 'react';
import { Link } from 'react-router-dom';

import shareDoc from '../models/shareDoc.jsx';

function DocInfo ({ docId, username, docTitle, docContent }) {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [showForm, setShowForm] = useState(false);

    async function handleMail(event) {
        event.preventDefault();

        const message = {
            to: `${email}`,
            // from: 'lucasdanielssonvalladares@gmail.com',
            subject: `${username} delar ett dokument med dig`,
            text: `Hej! ${username} vill dela ett dokument med dig. Dokument id: ${docId}. Om du inte redan är registrerad så kan du registrera dig på: https://7rip7ych.github.io/lucid-frontend/register`,
            html: `<h1>Hej!</h1>
            <p>${username} vill dela ett dokument med dig.</p>
            <p>Dokument id: ${docId}</p>
            <p>Om du inte redan är registrerad så kan du registrera dig här <a href="https://7rip7ych.github.io/lucid-frontend/register">här</a></p>
            `
        };

        const result = await shareDoc.sendMail(message);

        if(result.error) {
            setMessage(<p style={{ color: 'red' }}>Error</p>);
        }

        alert(`Mailet skickades till ${email}`);

        setShowForm(false);
    }

    function shareForm() {
        return (
            <>
            <form onSubmit={handleMail} className='share-form'>

            <p><label>Dela dokument med: </label></p>
            <p>
            <input className='share-text'
                    type="email"
                    value={email}
                    placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)}
            />
            </p>
            <input className="document-button" type="submit" value="Skicka"/>
            <button className="document-button" onClick={() => setShowForm(false)}>
                Stäng
            </button>

            </form>
            {message}
            </>
        )
    }

    return (
        <>
        { !showForm ? (
            <div key={docId} className="document">

            <h3 key={docId}>{docTitle}</h3>

            <div className="document-content">
                <p>{docContent.slice(0, 40)} ...</p>
            </div>

            <Link to={docId} className="document-button">Skriv</Link>
            <button className="document-button" onClick={() => setShowForm(true)}>
                Dela
            </button>

            </div>
            ) : (
                shareForm()
        )}
        </>
    )
}

export default DocInfo;

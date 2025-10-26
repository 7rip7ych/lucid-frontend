import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import auth from './models/auth';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    document.title = 'Register';

    const handleRegister = async (event) => {
        event.preventDefault();
        document.body.classList.add("loading"); // Change cursor to loading

        if (password !== password2) {
            setErrorMessage("Lösenorden matchar inte!");
            return;
        }

        const result = await auth.register(email, password);

        document.body.classList.remove("loading"); // Change back cursor
        if (result !== "ok") {
            setErrorMessage("Registrering misslyckades. Försök igen.");
        } else {
            setErrorMessage('');
            alert("Registrering lyckades!");
            navigate("/lucid-frontend/");
        }
    };

    return (
        <>
        <div className="login-header">
            <h1>Registrera ny användare</h1>
        </div>

        <form onSubmit={handleRegister} className="login-form">

        <p><label>E-mail: </label></p>
        <input className='input'
                type="email"
                value={email}
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
                // readOnly={!!email}
                required
            />

        <p><label>Lösenord: </label></p>
        <input className='input'
                type="password"
                value={password}
                placeholder='******'
                onChange={(e) => setPassword(e.target.value)}
                required
            />

        <p><label>Repetera lösenord: </label></p>
        <input className='input'
                type="password"
                value={password2}
                placeholder='******'
                onChange={(e) => setPassword2(e.target.value)}
                required
            />

        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

        <p>
        <button className='login-button' type="submit">
            Register
        </button>
        </p>

        </form>
        </>
    );
};

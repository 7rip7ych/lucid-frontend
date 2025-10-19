import React, { useState, useEffect } from 'react';
import auth from './models/auth';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    document.title = 'Login';

    //changes route when mounting
    useEffect(() => {
        navigate("/lucid-frontend/login");
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();
        document.body.classList.add("loading"); // Change cursor to loading

        const result = await auth.login(email, password);
        if (result.error) {
            setErrorMessage("Skrivit fel lösenord eller användarnamn.");
            return;
        }
        
        document.body.classList.remove("loading"); // Change back cursor
        alert("Login lyckades!");
        navigate("/lucid-frontend/");
        return;
    };


    return (
        <>
        <div className="login-header">
            <h1>Logga in</h1>
        </div>

        <form onSubmit={handleLogin} className='login-form'>

        <p><label>E-mail/Användarnamn: </label></p>
        <input className='input form-input'
                type="email"
                value={email}
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
                required
            />

        <p><label>Lösenord: </label></p>
        <input className='input form-input'
                type="password"
                value={password}
                placeholder='******'
                onChange={(e) => setPassword(e.target.value)}
                required
            />

        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        
        <div className='login-buttons'>
        <button className='login-button' type="submit">
            Logga in
        </button>

        <Link to="/lucid-frontend/register" className='login-button'>Registera ny användare</Link>
        </div>
        
        </form>
        </>
    );
}

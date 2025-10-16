import React, { useEffect } from 'react';
import auth from '../models/auth';
import { useNavigate } from 'react-router-dom';

//resets session and redirect to home page
export default function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        auth.resetSession();
        navigate("/lucid-frontend/login");
    }, []);
};

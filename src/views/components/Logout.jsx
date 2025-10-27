import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import auth from '../models/auth';

//resets session and redirect to home page
export default function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        auth.resetSession();
        navigate("/lucid-frontend/login");
    });
};

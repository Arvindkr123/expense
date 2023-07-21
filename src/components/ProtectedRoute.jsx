import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../store/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ Component }) => {
    const { isLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    console.log(isLogin)

    useEffect(() => {
        if (!isLogin) {
            // If the user is not logged in, navigate to the login page
            navigate("/login");
        }
    }, [isLogin, navigate]);

    // Render the specified component if the user is logged in
    return isLogin ? <Component /> : null;
};

export default ProtectedRoute;

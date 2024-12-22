import React from 'react';
import Register from '../components/Register';

const RegisterPage = () => {
    return (
        <div className="auth">
            <div className="container mt-3 flex-center">
                <div className="row d-flex justify-content-center">
                    <div className="w-50  mt-5 p-5 border-2 border-opacity-75 border-auth">
                        <h2>Register</h2>
                        <Register />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;

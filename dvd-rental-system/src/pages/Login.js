import React from 'react';
import Login from '../components/Login';

const LoginPage = () => {
    return (
        <div className="auth">
            <div className="container mt-3 flex-center">
                <div className="row d-flex justify-content-center">
                    <div className="col-sm-5  mt-5 p-5 border-2 border-opacity-75 border-auth">
                        <h2>Welcome Back!</h2>
                        <Login />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default LoginPage;
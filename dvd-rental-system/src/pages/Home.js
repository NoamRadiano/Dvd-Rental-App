import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div style={{textAlign:"center"}}>
            <div style={{marginTop:"300px"}}></div>
            <h1 className='App-color-title App-title mt-5'>Welcome to DVD Rental System</h1>

            <Link class="btn btn-outline-success m-3"  to="/login">Log In</Link>
            
            <Link className="btn btn-outline-success m-3" to="/register">Sign Up</Link>
        </div>
    );
};

export default Home;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Register.css";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const apiEndpointUrl = process.env.REACT_APP_API_URL;


    const handleButtonClick = async (event) => {
        try {
            fetch(`${apiEndpointUrl}/api/users/`, {
            // fetch("https://vercel-backend-deployment-test-d24q.vercel.app/api/users/", {
                    method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
        }
        catch (error) {
            console.log("Error : ", error);
        }
    };

    const changeUsername = (event) => {
        setUsername(event.target.value);
    };
    const changePassword = (event) => {
        setPassword(event.target.value);
    };

    return (
        <div id="register-container">
            <h1 className="boxhub-title">🥊 BoxHub</h1>
            <h2 className="auth-subtitle">Join the Fight Community</h2>
            
            <form className="auth-form">
                <div className="form-group">
                    <input 
                        type="text" 
                        id="username" 
                        className="auth-input"
                        value={username} 
                        placeholder="Choose your username" 
                        onChange={changeUsername}
                    />
                </div>
                
                <div className="form-group">
                    <input 
                        type="password" 
                        id="password" 
                        className="auth-input"
                        value={password} 
                        placeholder="Create your password" 
                        onChange={changePassword}
                    />
                </div>

                <button 
                    id="register-button" 
                    className="auth-button"
                    onClick={handleButtonClick}
                >
                    Sign Up & Fight
                </button>
            </form>

            <div className="auth-footer">
                <p className="auth-link-text">
                    Already have an account?{" "}
                    <Link to="/login" className="auth-link">Login here</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
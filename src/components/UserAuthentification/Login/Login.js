import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../../context/UserContext';
import "./Login.css";

function Login() {

    const [enteredUsername, setEnteredUsername] = useState("");
    const [enteredPassword, setEnteredPassword] = useState("");
    const { username, setUsername } = useContext(UserContext); // Access username and setUsername from context

    const apiEndpointUrl = process.env.REACT_APP_API_URL;

    const navigate = useNavigate();

    const handleButtonClick = async () => {

        try {
            // fetch(`${apiEndpointUrl}/api/users?action=login`)

            // const response = await fetch("https://vercel-backend-deployment-test-d24q.vercel.app/api/users?action=login", {
            const response = await fetch(`${apiEndpointUrl}/api/users?action=login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: enteredUsername,
                    password: enteredPassword,
                }),
            });

            const responseJSON = await response.json();

            if (responseJSON.success === true) {
                setUsername(enteredUsername);
                navigate("/");
            } else {
                console.log("login failed");
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
    };


    const changeEnteredUsername = (event) => {
        setEnteredUsername(event.target.value);
    };
    const changeEnteredPassword = (event) => {
        setEnteredPassword(event.target.value);
    };

    return (
        <div id="login-container">
            <h1 className="boxhub-title">🥊 BoxHub</h1>
            <h2 className="auth-subtitle">Enter the Ring</h2>
            
            <div className="form-group">
                <input 
                    type="text" 
                    id="username" 
                    className="auth-input"
                    value={enteredUsername} 
                    placeholder="Username" 
                    onChange={changeEnteredUsername}
                />
            </div>
            
            <div className="form-group">
                <input 
                    type="password" 
                    id="password" 
                    className="auth-input"
                    value={enteredPassword} 
                    placeholder="Password" 
                    onChange={changeEnteredPassword}
                />
            </div>

            <button 
                id="login-button" 
                className="auth-button"
                onClick={handleButtonClick}
            >
                Enter the Ring
            </button>

            <div className="auth-footer">
                <p className="auth-link-text">
                    Don't have an account?{" "}
                    <Link to="/register" className="auth-link">Register here</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
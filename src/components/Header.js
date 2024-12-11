import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

function Header() {
    const [isLogin, setIsLogin] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            const userData = JSON.parse(localStorage.getItem('userData'));
            setIsAuthenticated(true);
            setUserEmail(userData ? userData.email : '');
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const handleShowForm = (isLogin) => {
        setIsLogin(isLogin);
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        setIsAuthenticated(false);
    };

    return (
        <>
            <header className="bg-light py-3">
                <div className="container d-flex justify-content-between align-items-center">
                    <h1 className="mb-0">Forms</h1>
                    
                    <div className="flex-grow-1 mx-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search"
                        />
                    </div>
   
                    <div className="d-flex align-items-center">
                        {isAuthenticated ? (
                            <>
                                <span className="mr-3">Hello, {userEmail}</span>
                                <button
                                    className="btn btn-danger ml-2"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <button
                                className="btn btn-primary ml-2"
                                onClick={() => handleShowForm(!isLogin)}
                            >
                                {isLogin ? 'Sign Up' : 'Sign In'}
                            </button>
                        )}
                    </div>
                </div>
            </header>

            {showForm && (
                isLogin
                    ? <LoginForm
                        onClose={handleCloseForm}
                        setIsLogin={setIsLogin}
                        setIsAuthenticated={setIsAuthenticated}
                        setUserEmail={setUserEmail}
                    />
                    : <RegisterForm
                        onClose={handleCloseForm}
                        setIsLogin={setIsLogin}
                    />
            )}
        </>
    );
}

export default Header;

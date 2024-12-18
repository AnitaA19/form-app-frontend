import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Forms from './CreateTemplate';
import { useNavigate } from 'react-router-dom'; // For redirection
import '../index.css';

function Header() {
    const [isLogin, setIsLogin] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userEmail, setUserEmail] = useState('');

    const navigate = useNavigate(); // For navigation to the home page

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const expiryTime = localStorage.getItem('authExpiryTime');
    
        if (token && expiryTime) {
            const currentTime = new Date().getTime();
            if (currentTime > expiryTime) {
                localStorage.removeItem('authToken');
                localStorage.removeItem('userData');
                localStorage.removeItem('authExpiryTime');
                setIsAuthenticated(false);
                navigate('/'); 
            } else {
                const userData = JSON.parse(localStorage.getItem('userData'));
                setIsAuthenticated(true);
                setUserEmail(userData ? userData.email : '');
            }
        } else {
            setIsAuthenticated(false);
        }
    }, [navigate]);

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
        localStorage.removeItem('authExpiryTime');
        setIsAuthenticated(false);
        navigate('/');
    };

    return (
        <>
            <header className="bg-light text-dark py-3 shadow-sm border-bottom flex-container" style={{ backgroundColor: '#E6E6FA' }}>
                <div className="container d-flex justify-content-between align-items-center">
                    <h1 className="mb-0 fw-bold" style={{ color: '#4B0082' }}>
                        <a href="/" style={{ textDecoration: 'none', color: '#4B0082' }}>
                            Forms
                        </a>
                    </h1>
                    <div className="d-flex w-50 justify-content-center">
                        <input
                            type="text"
                            className="form-control rounded-pill border-0"
                            style={{ backgroundColor: '#F8F8FF', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
                            placeholder="Search"
                        />
                    </div>

                    {isAuthenticated ? (
                        <div className="d-flex align-items-center">
                            <span className="text-dark me-3" style={{ fontSize: '1.1rem', color: '#4B0082' }}>
                                Welcome, {userEmail.slice(0, 4)}
                            </span>
                            <button
                                className="btn btn-outline-dark rounded-pill px-4"
                                style={{ borderColor: '#4B0082', color: '#4B0082' }}
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <button
                            className="btn rounded-pill px-4"
                            style={{ backgroundColor: '#9370DB', color: '#FFF' }}
                            onClick={() => handleShowForm(!isLogin)}
                        >
                            {isLogin ? 'Sign Up' : 'Sign In'}
                        </button>
                    )}
                </div>
            </header>

            {showForm && (
                isLogin ? (
                    <LoginForm
                        onClose={handleCloseForm}
                        setIsLogin={setIsLogin}
                        setIsAuthenticated={setIsAuthenticated}
                        setUserEmail={setUserEmail}
                    />
                ) : (
                    <RegisterForm onClose={handleCloseForm} setIsLogin={setIsLogin} />
                )
            )}

            <Forms isAuthenticated={isAuthenticated} />
        </>
    );
}

export default Header;
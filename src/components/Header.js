import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

function Header() {
    const [isLogin, setIsLogin] = useState(true);
    const [showForm, setShowForm] = useState(false);

    const handleShowForm = (isLogin) => {
        setIsLogin(isLogin);
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
    };

    return (
        <>
            <header className="bg-light py-3">
                <div className="container d-flex justify-content-between align-items-center">
                    <h1 className="mb-0">Forms</h1>
                    <div className="d-flex w-50 justify-content-center">
                        <input type="text" className="form-control" placeholder="Search" />
                    </div>
                    <button
                        className="btn btn-primary ml-2"
                        onClick={() => handleShowForm(!isLogin)}
                    >
                        {isLogin ? 'Sign Up' : 'Sign In'}
                    </button>
                </div>
            </header>

            {showForm && (
                isLogin
                ? <LoginForm onClose={handleCloseForm} />
                : <RegisterForm onClose={handleCloseForm} />
            )}
        </>
    );
}

export default Header;

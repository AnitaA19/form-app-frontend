import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

function Header() {
    const [isRegistered, setIsRegistered] = useState(false);  // tracks whether user is in login or register mode
    const [showForm, setShowForm] = useState(false);

    const handleShowForm = (isLogin) => {
        setIsRegistered(isLogin);  // set to 'true' for login, 'false' for signup
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
                        onClick={() => handleShowForm(true)}  // Set to login when "Sign In" is clicked
                    >
                        {isRegistered ? 'Sign In' : 'Sign Up'}
                    </button>
                </div>
            </header>

            {showForm && (
                isRegistered
                ? <LoginForm onClose={handleCloseForm} />
                : <RegisterForm onClose={handleCloseForm} />
            )}
        </>
    );
}

export default Header;
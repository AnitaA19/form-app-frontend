import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate, useLocation } from 'react-router-dom';
import QuestionFormList from './QuestionFormList';

function Forms({ isAuthenticated }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        setIsCreating(location.pathname === '/create-template');
    }, [location.pathname]);

    const handleButtonClick = () => {
        if (!isAuthenticated) return;

        if (!isCreating) {
            setIsCreating(true);
            navigate('/create-template');
        } else {
            setIsCreating(false);
            navigate('/');
        }
    };

    return (
        <section className="py-5" style={{ backgroundColor: '#E6E6FA' }}>
            <div className="container">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="text-secondary" style={{ color: '#6f42c1' }}>Create a Template</h2>
                    <button className="btn btn-link text-secondary" style={{ color: '#6f42c1' }}>Gallery</button>
                </div>

                {isAuthenticated && (
                    <div className="text-center mb-4">
                        <button
                            onClick={handleButtonClick}
                            className={`btn rounded-circle border shadow-sm transition-all duration-300 ease-in-out ${
                                !isCreating ? 'btn-light' : 'btn-danger'
                            }`}
                            style={{
                                width: '80px',
                                height: '80px',
                                fontSize: '36px',
                                color: !isCreating ? '#4285F4' : 'white',
                                borderColor: '#6f42c1',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <i className={`fas ${!isCreating ? 'fa-plus' : 'fa-arrow-left'}`} style={{ color: !isCreating ? '#6f42c1' : 'white' }}></i>
                        </button>
                    </div>
                )}

                <div className="row">
                    <div className="col-12 text-center">
                        <p className="text-muted" style={{ color: '#6f42c1' }}>
                            {!isAuthenticated
                                ? 'Log in to add a form'
                                : isCreating
                                ? 'Go back to main page'
                                : 'You do not have any form. Click "+" to add a form'}
                        </p>
                    </div>
                </div>
            </div>
            <QuestionFormList />
        </section>
    );
}

export default Forms;

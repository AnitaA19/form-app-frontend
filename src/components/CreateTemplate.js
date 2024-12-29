import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import QuestionFormList from './QuestionFormList';

function Forms({ isAuthenticated }) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const [isCreating, setIsCreating] = useState(false);
    const [isGalleryView, setIsGalleryView] = useState(false); 

    useEffect(() => {
        setIsCreating(location.pathname === '/create-template');
    }, [location.pathname]);

    const handleCreateButtonClick = () => {
        if (!isAuthenticated) return;

        if (!isCreating) {
            setIsCreating(true);
            navigate('/create-template');
        } else {
            setIsCreating(false);
            navigate('/');
        }
    };

    const handleGalleryButtonClick = () => {
        if (!isAuthenticated) return;
        
        setIsGalleryView(!isGalleryView);
    };

    return (
        <section className="py-5" style={{ backgroundColor: '#E6E6FA' }}>
            <div className="container">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="text-secondary">{t('create_template')}</h2>
                    <button
                        className="btn btn-link text-secondary"
                        style={{ color: '#6f42c1' }}
                        onClick={handleGalleryButtonClick} 
                    >
                        {t('gallery')}
                    </button>
                </div>

                {isAuthenticated && (
                    <div className="text-center mb-4">
                        <button
                            onClick={handleCreateButtonClick}
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
                                ? t('log_in_to_add_form')
                                : isCreating
                                ? t('go_back_to_main_page')
                                : t('no_forms_click_to_add')}
                        </p>
                    </div>
                </div>
            </div>

            {isGalleryView && <QuestionFormList />}

        </section>
    );
}

export default Forms;
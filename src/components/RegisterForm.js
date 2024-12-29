import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../index.css';

function RegisterForm({ onClose, setIsLogin }) {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://localhost:3000/api/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            console.log("Backend Response Data:", data);

            if (response.ok) {
                if (data.token) {
                    console.log("Token Received:", data.token);
                    localStorage.setItem('authToken', data.token);
                } else {
                    console.error("Token is missing from the response");
                    setError('Token missing from the response');
                }
                onClose();
            } else {
                setError(data.error || data.message);
            }
        } catch (err) {
            console.error('Error in registration request:', err);
            setError('Network error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="modal-backdrop fade show" style={{ backdropFilter: 'blur(5px)' }}></div>
            <div className="modal show d-flex align-items-center justify-content-center" style={{ display: 'block', zIndex: 1050 }} tabIndex="-1" role="dialog">
                <div className="modal-dialog custom-modal" role="document">
                    <div className="modal-content custom-modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-center w-100">{t('sign_up')}</h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleRegister}>
                                <div className="form-group mb-3">
                                    <label htmlFor="email" className="form-label">{t('email')}</label>
                                    <input
                                        type="email"
                                        className="form-control custom-input"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="password" className="form-label">{t('password')}</label>
                                    <input
                                        type="password"
                                        className="form-control custom-input"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                {error && <div className="alert alert-danger mb-3">{error}</div>}
                                <button type="submit" className="btn custom-btn w-100 mb-3" style={{ backgroundColor: '#9370DB', color: '#FFF' }} disabled={loading}>
                                    {loading ? t('registering') : t('register')}
                                </button>
                            </form>
                            <div className="text-center mt-4">
                                <p className="custom-text mb-1">{t('have_account')}</p>
                                <button className="btn btn-link custom-link" onClick={() => setIsLogin(true)} style={{ color: '#9370DB', textDecoration: 'none' }}>
                                    {t('log_in')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RegisterForm;
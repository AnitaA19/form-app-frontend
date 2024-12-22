import React, { useState } from 'react';
import '../index.css';

function LoginForm({ onClose, setIsLogin, setIsAuthenticated, setUserEmail }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
    
        try {
            const response = await fetch(`http://localhost:3000/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
    
            const data = await response.json();
            if (response.ok) {
                const currentTime = new Date().getTime();  
                const expiryDuration = 3600 * 1000; 
                const expiryTime = currentTime + expiryDuration;  
    
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('userData', JSON.stringify({ email: data.email }));
                localStorage.setItem('authExpiryTime', expiryTime); 
    
                setIsAuthenticated(true);
                setUserEmail(data.email);
                onClose();
            } else {
                setError(data.message);
            }
        } catch (err) {
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
                            <h5 className="modal-title text-center w-100">Login</h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleLogin}>
                                <div className="form-group mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
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
                                    <label htmlFor="password" className="form-label">Password</label>
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
                                <button type="submit" className="btn custom-btn w-100 mb-3"  style={{ backgroundColor: '#9370DB', color: '#FFF' }} disabled={loading}>
                                    {loading ? 'Logging in...' : 'Log in'}
                                </button>
                            </form>
                            <div className="text-center mt-4">
                                <p className="custom-text mb-1">Don't have an account?</p>
                                <button className="btn btn-link custom-link" onClick={() => setIsLogin(false)} style={{
        color: '#9370DB',
        textDecoration: 'none'}} >
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginForm;
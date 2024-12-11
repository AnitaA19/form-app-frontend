import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Forms() {
    const [forms, setForms] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const addNewForm = () => {
        const newForm = { id: forms.length + 1, title: `Form ${forms.length + 1}` };
        setForms([...forms, newForm]);
    };

    return (
        <section className="py-5">
            <div className="container">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="text-secondary">Create a form</h2>
                    <button className="btn btn-link text-secondary">Gallery</button>
                </div>

                {isAuthenticated && (
                    <div className="text-center mb-4">
                        <button
                            onClick={addNewForm}
                            className="btn btn-light rounded-circle border shadow-sm"
                            style={{ width: '80px', height: '80px', fontSize: '36px', color: '#4285F4' }}
                        >
                            <i className="fas fa-plus"></i>
                        </button>
                    </div>
                )}

                <div className="row">
                    {forms.length === 0 ? (
                        <div className="col-12 text-center">
<p className="text-muted">
  {isAuthenticated ? 'You do not have any form. Click "+" to add a form' : 'Registered to add a form'}
</p>
                        </div>
                    ) : (
                        forms.map((form) => (
                            <div className="col-md-3 col-sm-6 mb-4" key={form.id}>
                                <div className="card shadow-sm">
                                    <div className="card-body text-center">
                                        <h5 className="card-title">{form.title}</h5>
                                        <p className="card-text text-muted">Template</p>
                                        <button className="btn btn-primary btn-sm">Edit</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}

export default Forms;

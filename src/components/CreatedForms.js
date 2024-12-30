import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from 'react-i18next';

function CreatedForms() {
    const { t } = useTranslation();
    const [selectedAuthor, setSelectedAuthor] = useState('');
    const [forms, setForms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchForms = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/questions`);
                setForms(response.data.forms);
            } catch (error) {
                console.error('Error fetching questions:', error);
                setError(t('failed_to_fetch_questions'));
            } finally {
                setLoading(false);
            }
        };

        fetchForms();
    }, [t]);

    const filteredForms = selectedAuthor
        ? forms.filter(form => form.user_id === selectedAuthor)
        : forms;

    const authors = [...new Set(forms.map(form => form.user_id))];

    return (
        <section className="py-5" style={{ backgroundColor: '#E6E6FA' }}>
            <div className="container">
                <p className="h4 mb-4" style={{ color: '#6f42c1' }}>{t('latest_forms')}</p>

                <div className="mb-4">
                    <label htmlFor="authorSelect" className="form-label" style={{ color: '#6f42c1' }}>{t('author')}:</label>
                    <select 
                        id="authorSelect" 
                        className="form-select"
                        value={selectedAuthor} 
                        onChange={(e) => setSelectedAuthor(e.target.value)}
                        style={{
                            borderColor: '#6f42c1',
                            backgroundColor: '#F8F8FF',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <option value="">{t('all_authors')}</option>
                        {authors.map((author, index) => (
                            <option key={index} value={author}>{author}</option>
                        ))}
                    </select>
                </div>

                {loading ? (
                    <p style={{ color: '#6f42c1' }}>{t('loading')}</p>
                ) : error ? (
                    <p className="text-danger">{error}</p>
                ) : filteredForms.length === 0 ? (
                    <p style={{ color: '#6f42c1' }}>{t('no_forms_available')}</p>
                ) : (
                    <div className="row">
                        {filteredForms.map((form) => (
                            <div className="col-md-4 mb-4" key={form.form_id}>
                                <div className="card" style={{ borderColor: '#6f42c1', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                                    <img src={form.image_url} className="card-img-top" alt={form.title} />
                                    <div className="card-body">
                                        <h5 className="card-title" style={{ color: '#6f42c1' }}>{form.title}</h5>
                                        <p className="card-text" style={{ color: '#6f42c1' }}>{t('author')}: {form.user_id}</p>
                                        <p className="card-text" style={{ color: '#6f42c1' }}>{t('description')}: {form.description}</p>
                                        <p className="card-text" style={{ color: '#6f42c1' }}>{t('theme')}: {form.theme}</p>
                                        <button className="btn btn-primary" style={{ backgroundColor: '#6f42c1', borderColor: '#6f42c1' }}>{t('edit')}</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

export default CreatedForms;
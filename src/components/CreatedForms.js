import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from 'react-i18next';

function CreatedForms() {
    const { t } = useTranslation();
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/questions`);
                setQuestions(response.data.questions_by_authors);
            } catch (error) {
                console.error('Error fetching questions:', error);
                setError(t('failed_to_fetch_questions'));
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();

        const token = localStorage.getItem('authToken');
        if (token) {
            setIsAuthenticated(true);
        }
    }, [t]);

    return (
        <section className="py-5" style={{ backgroundColor: '#E6E6FA' }}>
            <div className="container">
                <p className="h4 mb-4" style={{ color: '#6f42c1' }}>{t('latest_questions')}</p>

                {loading ? (
                    <p style={{ color: '#6f42c1' }}>{t('loading')}</p>
                ) : error ? (
                    <p className="text-danger">{error}</p>
                ) : Object.keys(questions).length === 0 ? (
                    <p style={{ color: '#6f42c1' }}>{t('no_questions_available')}</p>
                ) : (
                    <div className="row">
                        {Object.keys(questions).map((authorEmail) => (
                            <div key={authorEmail} className="col-12 mb-4">
                                <h3 style={{ color: '#6f42c1' }}>{t('author_email')}: {authorEmail}</h3>
                                <div className="row">
                                    {questions[authorEmail].map((question) => (
                                        <div key={question.question_id} className="col-md-6 col-lg-4 mb-3">
                                            <div className="card h-100" style={{ borderColor: '#6f42c1', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                                                <div className="card-body">
                                                    <h5 className="card-title" style={{ color: '#6f42c1' }}>{question.name}</h5>
                                                    <p className="card-text" style={{ color: '#6f42c1' }}>{t('description')}: {question.description}</p>
                                                    <p className="card-text" style={{ color: '#6f42c1' }}>{t('template_id')}: {question.template_id}</p>
                                                    <p className="card-text" style={{ color: '#6f42c1' }}>{t('answer_type')}: {question.answer_type}</p>
                                                    <p className="card-text" style={{ color: '#6f42c1' }}>{t('answers')}: {JSON.stringify(question.answers)}</p>
                                                    {isAuthenticated ? (
                                                        <button className="btn btn-primary" style={{ backgroundColor: '#6f42c1', borderColor: '#6f42c1' }}>{t('fill')}</button>
                                                    ) : (
                                                        <p className="text-muted">{t('login_to_fill')}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
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
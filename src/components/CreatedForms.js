import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function CreatedForms() {
    const [selectedAuthor, setSelectedAuthor] = useState('');
    const [forms, setForms] = useState([]);

    const filteredForms = selectedAuthor
        ? forms.filter(form => form.author === selectedAuthor)
        : forms;

    const authors = [...new Set(forms.map(form => form.author))];

    return (
        <section className="py-5">
            <div className="container">
                <p className="h4 mb-4">Latest Forms</p>

                <div className="mb-4">
                    <label htmlFor="authorSelect" className="form-label">Author:</label>
                    <select 
                        id="authorSelect" 
                        className="form-select"
                        value={selectedAuthor} 
                        onChange={(e) => setSelectedAuthor(e.target.value)}
                    >
                        <option value="">All authors</option>
                        {authors.map((author, index) => (
                            <option key={index} value={author}>{author}</option>
                        ))}
                    </select>
                </div>

                {filteredForms.length === 0 ? (
                    <p>No forms available.</p>
                ) : (
                    <div className="row">
                        {filteredForms.map((form) => (
                            <div className="col-md-4 mb-4" key={form.id}>
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{form.title}</h5>
                                        <p className="card-text">Author: {form.author}</p>
                                        <button className="btn btn-primary">Edit</button>
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

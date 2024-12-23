import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const TemplatesCRUD = () => {
  const { id } = useParams(); // Access the 'id' param using useParams hook
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  
  const [templateData, setTemplateData] = useState({
    name: '',
    description: '',
    theme: '',
    public: null,
    image: null,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Fetch template data by ID from the database
    if (id) {
      axios
        .get(`http://localhost:3000/api/templates/${id}`)
        .then((response) => {
          const { title, description, theme, is_public, image_url } = response.data.template;
          setTemplateData({
            name: title,
            description,
            theme,
            public: is_public === 1,
            image: image_url,
          });
        })
        .catch((err) => {
          console.error('Error fetching template:', err);
          setError('Failed to fetch template');
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!templateData.name || !templateData.description || !templateData.theme || templateData.public === null) {
      setError('Please fill in all the fields.');
      setSuccess('');
      return;
    }

    setError('');
    setSuccess('Template updated successfully!');

    const formData = new FormData();
    formData.append('title', templateData.name);
    formData.append('description', templateData.description);
    formData.append('theme', templateData.theme);
    formData.append('is_public', templateData.public ? 1 : 0);
    if (templateData.image) formData.append('image', templateData.image);

    // Update the template via API
    axios
      .put(`http://localhost:3000/api/templates/${id}`, formData)
      .then((response) => {
        setSuccess(response.data.message);
      })
      .catch((err) => {
        console.error('Error updating template:', err);
        setError('Failed to update template');
      });
  };

  const handleDelete = () => {
    // Delete the template via API
    axios
      .delete(`http://localhost:3000/api/templates/${id}`)
      .then((response) => {
        setSuccess(response.data.message);
        navigate('/templates'); // Redirect to the template list page using navigate
      })
      .catch((err) => {
        console.error('Error deleting template:', err);
        setError('Failed to delete template');
      });
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header" style={{ backgroundColor: "#6f42c1", color: "white" }}>
          <h4>Edit Template</h4>
        </div>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <form onSubmit={handleSubmit}>
            {/* Template Name */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={templateData.name}
                onChange={(e) => setTemplateData({ ...templateData, name: e.target.value })}
                placeholder="Enter template name"
              />
            </div>

            {/* Template Description */}
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={templateData.description}
                onChange={(e) => setTemplateData({ ...templateData, description: e.target.value })}
                placeholder="Enter description"
                rows="3"
              ></textarea>
            </div>

            {/* Theme Selection */}
            <div className="mb-3">
              <label htmlFor="theme" className="form-label">Theme</label>
              <select
                className="form-select"
                id="theme"
                name="theme"
                value={templateData.theme}
                onChange={(e) => setTemplateData({ ...templateData, theme: e.target.value })}
              >
                <option value="">Select a theme</option>
                <option value="data-science">Data Science</option>
                <option value="front">Frontend</option>
                <option value="back">Backend</option>
                <option value="devops">DevOps</option>
                <option value="database">Database</option>
              </select>
            </div>

            {/* Public/Private Selection */}
            <div className="mb-3">
              <label className="form-label">Public</label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="public"
                  id="publicYes"
                  value="yes"
                  checked={templateData.public === true}
                  onChange={() => setTemplateData({ ...templateData, public: true })}
                />
                <label className="form-check-label" htmlFor="publicYes">Yes</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="public"
                  id="publicNo"
                  value="no"
                  checked={templateData.public === false}
                  onChange={() => setTemplateData({ ...templateData, public: false })}
                />
                <label className="form-check-label" htmlFor="publicNo">No</label>
              </div>
            </div>

            {/* Image Upload */}
            <div className="mb-3">
              <label htmlFor="image" className="form-label">Image</label>
              <input
                className="form-control"
                type="file"
                id="image"
                onChange={(e) => setTemplateData({ ...templateData, image: e.target.files[0] })}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Update Template
            </button>
          </form>

          {/* Delete Button */}
          <button className="btn btn-danger w-100 mt-3" onClick={handleDelete}>
            Delete Template
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplatesCRUD;

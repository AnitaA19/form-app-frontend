import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const TemplatesCRUD = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate(); 
  
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
    if (id) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/templates/${id}`)
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
          setError(t('failed_to_fetch_template'));
        });
    }
  }, [id, t]);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!templateData.name || !templateData.description || !templateData.theme || templateData.public === null) {
      setError(t('fill_required_fields'));
      setSuccess('');
      return;
    }
  
    setError('');
    setSuccess(t('template_updated_successfully'));
  
    const formData = new FormData();
    formData.append('title', templateData.name);
    formData.append('description', templateData.description);
    formData.append('theme', templateData.theme);
    formData.append('is_public', templateData.public ? 1 : 0);
    if (templateData.image) formData.append('image', templateData.image);
  
    const token = localStorage.getItem('authToken'); 
  
    axios
      .put(`${process.env.REACT_APP_API_URL}/templates/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSuccess(response.data.message);
      })
      .catch((err) => {
        console.error('Error updating template:', err);
        setError(t('failed_to_update_template'));
      });
  };
  

  const handleDelete = () => {
    const token = localStorage.getItem('authToken'); 

    axios
      .delete(`${process.env.REACT_APP_API_URL}/templates/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log('Delete response:', response);
        setSuccess(response.data.message);
        navigate('/');
      })
      .catch((err) => {
        console.error('Error deleting template:', err);
        if (err.response) {
          console.error('Error response data:', err.response.data);
          console.error('Error response status:', err.response.status);
          console.error('Error response headers:', err.response.headers);
        }
        setError(t('failed_to_delete_template'));
      });
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header" style={{ backgroundColor: "#6f42c1", color: "white" }}>
          <h4>{t('edit_template')}</h4>
        </div>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">{t('name')}</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={templateData.name}
                onChange={(e) => setTemplateData({ ...templateData, name: e.target.value })}
                placeholder={t('enter_template_name')}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">{t('description')}</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={templateData.description}
                onChange={(e) => setTemplateData({ ...templateData, description: e.target.value })}
                placeholder={t('enter_description')}
                rows="3"
              ></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="theme" className="form-label">{t('theme')}</label>
              <select
                className="form-select"
                id="theme"
                name="theme"
                value={templateData.theme}
                onChange={(e) => setTemplateData({ ...templateData, theme: e.target.value })}
              >
                <option value="">{t('select_theme')}</option>
                <option value="data-science">{t('data_science')}</option>
                <option value="frontend">{t('frontend')}</option>
                <option value="backend">{t('backend')}</option>
                <option value="devops">{t('devops')}</option>
                <option value="database">{t('database')}</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">{t('public')}</label>
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
                <label className="form-check-label" htmlFor="publicYes">{t('yes')}</label>
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
                <label className="form-check-label" htmlFor="publicNo">{t('no')}</label>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="image" className="form-label">{t('image')}</label>
              <input
                className="form-control"
                type="file"
                id="image"
                onChange={(e) => setTemplateData({ ...templateData, image: e.target.files[0] })}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              {t('update_template')}
            </button>
          </form>

          <button className="btn btn-danger w-100 mt-3" onClick={handleDelete}>
            {t('delete_template')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplatesCRUD;
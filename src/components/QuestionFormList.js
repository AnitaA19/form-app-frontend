import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from 'react-i18next';

function UserQuestions() {
  const { t } = useTranslation();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questionData, setQuestionData] = useState({
    name: '',
    description: '',
    answerType: 'checkbox',
    showAnswer: '1',
    answers: [],
  });

  const navigate = useNavigate();

  const handleNavigate = (question) => {
    navigate(`/template-crud/${question.template_id}`);
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) return;

        const response = await fetch(`${process.env.REACT_APP_API_URL}/questions/user`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (!response.ok) throw new Error(`Failed to fetch, status: ${response.status}`);

        const data = await response.json();
        if (data.success) {
          setQuestions(data.questions);
        } else {
          setError(data.message || t('failed_to_fetch_questions'));
        }
      } catch (error) {
        setError(t('error_fetching_questions'));
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [t]);

  const handleEditClick = (question) => {
    setSelectedQuestion(question);
    const correctAnswers = Array.isArray(question.correct_answer)
      ? question.correct_answer
      : JSON.parse(question.correct_answer);

    setQuestionData({
      name: question.name,
      description: question.description,
      answerType: question.answer_type || 'checkbox',
      showAnswer: question.show_answer ? '1' : '0',
      answers: question.answers.map((answer, index) => ({
        text: answer,
        correct: correctAnswers.includes(index + 1),
        selected: correctAnswers.includes(index + 1),
      })),
    });

    setIsModalOpen(true);
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError(t('auth_token_missing'));
        return;
      }

      const response = await fetch(`${process.env.REACT_APP_API_URL}/questions/${selectedQuestion.question_id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(questionData),
      });

      if (response.ok) {
        const updatedQuestions = questions.map((q) =>
          q.question_id === selectedQuestion.question_id ? { ...q, ...questionData } : q
        );
        setQuestions(updatedQuestions);
        setIsModalOpen(false);
      } else {
        const data = await response.json();
        setError(data.message || t('failed_to_update_question'));
      }
    } catch (error) {
      setError(t('error_saving_changes'));
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError(t('auth_token_missing'));
        return;
      }

      const response = await fetch(`${process.env.REACT_APP_API_URL}/questions/${questionId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setQuestions(questions.filter((question) => question.question_id !== questionId));
      } else {
        const data = await response.json();
        setError(data.message || t('failed_to_delete_question'));
      }
    } catch (error) {
      setError(t('error_deleting_question'));
    }
  };

  return (
    <div className="container py-5" style={{ color: '#6f42c1' }}>
      <h2 className="text-center mb-4 fw-bold" style={{ color: '#6f42c1' }}>
        {t('your_questions')}
      </h2>

      {error && <div className="alert alert-danger" style={{ backgroundColor: '#6f42c1', color: '#fff' }}>{error}</div>}
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">{t('loading')}</span>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {questions.map((question) => (
            <div
              key={question.question_id}
              className="col-lg-4 col-md-6"
              onClick={(e) => {
                if (e.target.tagName !== 'BUTTON') {
                  handleNavigate(question);
                }
              }}
              style={{ cursor: 'pointer' }}
            >
              <div className="card h-100 shadow-sm border-0 hover-shadow" style={{ borderColor: '#6f42c1' }}>
                <div className="card-header" style={{ backgroundColor: '#6f42c1', color: '#fff' }}>
                  <h5 className="card-title mb-0">{question.name}</h5>
                </div>
                <div className="card-body">
                  <p className="card-text text-muted mb-3">{question.description}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="badge bg-light text-primary">
                      {question.answer_type === 'checkbox' ? t('multiple_choice') : t('text_response')}
                    </span>
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditClick(question);
                      }} 
                      style={{ color: '#6f42c1' }}
                    >
                      {t('edit')}
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteQuestion(question.question_id);
                      }} 
                      style={{ color: '#6f42c1' }}
                    >
                      {t('delete')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="modal show d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" style={{ color: '#6f42c1' }}>{t('edit_question')}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setIsModalOpen(false)}
                  style={{ color: '#6f42c1' }}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label" style={{ color: '#6f42c1' }}>{t('question_name')}</label>
                  <input
                    type="text"
                    className="form-control"
                    value={questionData.name}
                    onChange={(e) => setQuestionData({ ...questionData, name: e.target.value })}
                  />
                </div>
                {/* Rest of the modal content */}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsModalOpen(false)}
                  style={{ color: '#6f42c1' }}
                >
                  {t('cancel')}
                </button>
                <button type="button" className="btn btn-primary" onClick={handleSaveChanges} style={{ backgroundColor: '#6f42c1', color: '#fff' }}>
                  {t('save_changes')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserQuestions;
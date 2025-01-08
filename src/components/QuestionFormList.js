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
    correct_answer: []
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
        setError(t('error_fetching_questions') + ': ' + error.message);
      } finally {
        setLoading(false);
      }
    };    

    fetchQuestions();
  }, [t]);

  const handleEditClick = (question) => {
    setSelectedQuestion(question);
  
    let parsedAnswers = [];
    let parsedCorrectAnswers = [];
  
    try {
      parsedAnswers = typeof question.answers === 'string'
        ? JSON.parse(question.answers) 
        : question.answers || [];
      
      parsedCorrectAnswers = typeof question.correct_answer === 'string'
        ? JSON.parse(question.correct_answer)
        : question.correct_answer || [];
    } catch (e) {
      console.error('Error parsing:', e);
      parsedAnswers = [];
      parsedCorrectAnswers = [];
    }
  
    setQuestionData({
      name: question.name,
      description: question.description,
      answerType: question.answer_type || 'checkbox',
      showAnswer: question.show_answer ? '1' : '0',
      answers: parsedAnswers,
      correct_answer: parsedCorrectAnswers
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
  
      const requestData = {
        name: questionData.name,
        description: questionData.description,
        answerType: questionData.answerType,
        show_answer: questionData.showAnswer === '1',
        answers: questionData.answers.length > 0 ? questionData.answers : [],
        correct_answer: questionData.correct_answer.length > 0 ? questionData.correct_answer : []
      };
  
      const response = await fetch(`${process.env.REACT_APP_API_URL}/questions/${selectedQuestion.question_id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
  
      if (response.ok) {
        const updatedQuestion = {
          ...selectedQuestion,
          name: questionData.name,
          description: questionData.description,
          answer_type: questionData.answerType,
          show_answer: questionData.showAnswer === '1',
          answers: requestData.answers,
          correct_answer: requestData.correct_answer
        };
  
        setQuestions(questions.map((q) =>
          q.question_id === selectedQuestion.question_id ? updatedQuestion : q
        ));
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

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...questionData.answers];
    newAnswers[index] = value;
    setQuestionData({
      ...questionData,
      answers: newAnswers
    });
  };

  const handleCorrectAnswerChange = (index) => {
    const newCorrectAnswers = [...questionData.correct_answer];
    const answerNumber = index + 1;
    
    if (newCorrectAnswers.includes(answerNumber)) {
      const filteredAnswers = newCorrectAnswers.filter(num => num !== answerNumber);
      setQuestionData({
        ...questionData,
        correct_answer: filteredAnswers
      });
    } else {
      newCorrectAnswers.push(answerNumber);
      setQuestionData({
        ...questionData,
        correct_answer: newCorrectAnswers
      });
    }
  };

  const deleteAnswer = (index) => {
    const newAnswers = questionData.answers.filter((_, i) => i !== index);
    const newCorrectAnswers = questionData.correct_answer
      .filter(num => num !== index + 1)
      .map(num => num > index + 1 ? num - 1 : num);

    setQuestionData({
      ...questionData,
      answers: newAnswers,
      correct_answer: newCorrectAnswers
    });
  };

  const addAnswer = () => {
    setQuestionData({
      ...questionData,
      answers: [...questionData.answers, '']
    });
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
          <div className="modal-dialog overflow-hidden">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" style={{ color: '#6f42c1' }}>Edit Question</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setIsModalOpen(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label" style={{ color: '#6f42c1' }}>Question Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={questionData.name}
                    onChange={(e) => setQuestionData({ ...questionData, name: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" style={{ color: '#6f42c1' }}>Description</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={questionData.description}
                    onChange={(e) =>
                      setQuestionData({ ...questionData, description: e.target.value })
                    }
                  />
                </div>
                {questionData.answerType === 'checkbox' && (
                  <div>
                    <label className="form-label" style={{ color: '#6f42c1' }}>Answers</label>
                    {questionData.answers.map((answer, index) => (
                      <div key={index} className="d-flex align-items-center gap-2 mb-2">
                        <input
                          type="text"
                          className="form-control"
                          value={answer}
                          onChange={(e) => handleAnswerChange(index, e.target.value)}
                        />
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={questionData.correct_answer.includes(index + 1)}
                          onChange={() => handleCorrectAnswerChange(index)}
                        />
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteAnswer(index)}
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                    <button 
                      className="btn btn-primary btn-sm mt-2" 
                      onClick={addAnswer}
                    >
                      Add Answer
                    </button>
                  </div>
                )}
                <div className="mb-3">
                  <label className="form-check-label" style={{ color: '#6f42c1' }}>
                    Show Answer
                  </label>
                  <select
                    className="form-select"
                    value={questionData.showAnswer}
                    onChange={(e) =>
                      setQuestionData({ ...questionData, showAnswer: e.target.value })
                    }
                  >
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={handleSaveChanges}
                  style={{ backgroundColor: '#6f42c1', color: '#fff' }}
                >
                  Save Changes
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
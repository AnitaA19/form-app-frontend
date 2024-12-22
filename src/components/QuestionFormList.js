import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function UserQuestions() {
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

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) return;

        const response = await fetch('http://localhost:3000/api/questions/user', {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (!response.ok) throw new Error(`Failed to fetch, status: ${response.status}`);

        const data = await response.json();
        if (data.success) {
          setQuestions(data.questions);
        } else {
          setError(data.message || 'Failed to fetch questions.');
        }
      } catch (error) {
        setError('An error occurred while fetching the questions.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

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
        setError('Authentication token is missing.');
        return;
      }

      const response = await fetch(`http://localhost:3000/api/questions/${selectedQuestion.question_id}`, {
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
        setError(data.message || 'Failed to update the question.');
      }
    } catch (error) {
      setError('An error occurred while saving changes.');
    }
  };

  const addAnswer = () => {
    setQuestionData({
      ...questionData,
      answers: [...questionData.answers, { text: '', correct: false, selected: false }],
    });
  };

  const updateAnswer = (index, key, value) => {
    const updatedAnswers = [...questionData.answers];
    updatedAnswers[index][key] = value;
    setQuestionData({ ...questionData, answers: updatedAnswers });
  };

  const deleteAnswer = (index) => {
    const updatedAnswers = questionData.answers.filter((_, i) => i !== index);
    setQuestionData({ ...questionData, answers: updatedAnswers });
  };


  const handleDeleteQuestion = async (questionId) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('Authentication token is missing.');
        return;
      }

      const response = await fetch(`http://localhost:3000/api/questions/${questionId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setQuestions(questions.filter((question) => question.question_id !== questionId));
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to delete the question.');
      }
    } catch (error) {
      setError('An error occurred while deleting the question.');
    }
  };

  return (
    <div className="container py-5" style={{ color: '#6f42c1' }}>
      <h2 className="text-center mb-4 fw-bold" style={{ color: '#6f42c1' }}>
        Your Questions
      </h2>

      {error && <div className="alert alert-danger" style={{ backgroundColor: '#6f42c1', color: '#fff' }}>{error}</div>}
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {questions.map((question) => (
            <div key={question.question_id} className="col-lg-4 col-md-6">
              <div className="card h-100 shadow-sm border-0 hover-shadow" style={{ borderColor: '#6f42c1' }}>
                <div className="card-header" style={{ backgroundColor: '#6f42c1', color: '#fff' }}>
                  <h5 className="card-title mb-0">{question.name}</h5>
                </div>
                <div className="card-body">
                  <p className="card-text text-muted mb-3">{question.description}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="badge bg-light text-primary">
                      {question.answer_type === 'checkbox' ? 'Multiple Choice' : 'Text Response'}
                    </span>
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => handleEditClick(question)}
                      style={{ color: '#6f42c1' }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDeleteQuestion(question.question_id)}
                      style={{ color: '#6f42c1' }}
                    >
                      Delete
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
                <h5 className="modal-title" style={{ color: '#6f42c1' }}>Edit Question</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setIsModalOpen(false)}
                  style={{ color: '#6f42c1' }}
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
                          value={answer.text}
                          onChange={(e) => updateAnswer(index, 'text', e.target.value)}
                        />
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={answer.selected}
                          onChange={() => updateAnswer(index, 'selected', !answer.selected)}
                        />
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteAnswer(index)}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button className="btn btn-primary btn-sm mt-2" onClick={addAnswer}>
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
                  style={{ color: '#6f42c1' }}
                >
                  Cancel
                </button>
                <button type="button" className="btn btn-primary" onClick={handleSaveChanges} style={{ backgroundColor: '#6f42c1', color: '#fff' }}>
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

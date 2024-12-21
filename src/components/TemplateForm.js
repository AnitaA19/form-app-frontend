import { useState } from "react";
import axios from "axios";

function TemplateForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    theme: "",
    public: false,
    image: null,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [templateId, setTemplateId] = useState(null);
  const [questionData, setQuestionData] = useState({
    name: "",
    description: "",
    answerType: "checkbox",
    showQuestion: false,
    answers: [{ text: "", selected: false }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleRadioChange = (e) => {
    setFormData({
      ...formData,
      public: e.target.value === "yes",
    });
  };

  const handleQuestionChange = (e) => {
    const { name, value } = e.target;
    setQuestionData({
      ...questionData,
      [name]: value,
    });
  };

  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...questionData.answers];
    updatedAnswers[index] = { ...updatedAnswers[index], text: value };
    setQuestionData({
      ...questionData,
      answers: updatedAnswers,
    });
  };

  const handleCheckboxChange = (index) => {
    const updatedAnswers = [...questionData.answers];
    updatedAnswers[index] = { 
      ...updatedAnswers[index], 
      selected: !updatedAnswers[index].selected 
    };
    setQuestionData({
      ...questionData,
      answers: updatedAnswers,
    });
  };

  const handleAddAnswer = () => {
    setQuestionData({
      ...questionData,
      answers: [...questionData.answers, { text: "", selected: false }],
    });
  };

  const handleRemoveAnswer = (index) => {
    const updatedAnswers = questionData.answers.filter((_, i) => i !== index);
    setQuestionData({
      ...questionData,
      answers: updatedAnswers,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("You must be logged in to create a template.");
      setSuccess("");
      return;
    }
  
    if (!formData.name || !formData.description || !formData.theme) {
      setError("Please fill in all required fields.");
      setSuccess("");
      return;
    }
  
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("theme", formData.theme);
    formDataToSend.append("is_public", formData.public ? "1" : "0");
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }
  
    try {
      const response = await axios.post(
        "http://localhost:3000/api/templates/create",
        formDataToSend,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }
      );
    
      console.log("Response Data:", response.data);
    
      const newTemplateId = response.data.template_id;
      if (newTemplateId) {
        setSuccess("Template created successfully!");
        setError("");
        setFormData({
          name: "",
          description: "",
          theme: "",
          public: false,
          image: null,
        });
    
        setTemplateId(newTemplateId);
        setModalVisible(true);
      } else {
        setError("Failed to retrieve template ID.");
      }
    } catch (error) {
      console.error("Error Response:", error.response ? error.response.data : error);
      setError("Failed to create template. Please try again.");
      setSuccess("");
    }
    
  };  
  
  const handleQuestionSubmit = async () => {
    // Collecting all answers including both selected and unselected ones
    const allAnswers = questionData.answers.map(answer => answer.text);
  
    const questionDataToSend = {
      template_id: templateId,
      name: questionData.name,
      description: questionData.description,
      answerType: questionData.answerType,
      answers: allAnswers,  // Include all answers, not just selected ones
      show_answer: questionData.showQuestion ? 1 : 0, 
    };
  
    try {
      const token = localStorage.getItem("authToken"); 
      if (!token) {
        setError("You must be logged in to create a question.");
        return;
      }
  
      const response = await axios.post(
        `http://localhost:3000/api/${templateId}/questions`,
        questionDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
            'Content-Type': 'application/json',
          },
        }
      );
  
      setQuestionData({
        name: "",
        description: "",
        answerType: "checkbox",
        showQuestion: false, // Reset to default
        answers: [{ text: "", selected: false }],
      });
  
      setModalVisible(false);
      setSuccess("Question created successfully!");
      setError("");
    } catch (error) {
      console.error("API Error:", error.response ? error.response.data : error);
      setError(`Failed to create question: ${error.response?.data?.message || 'Unknown error'}`);
    }
  };
   
  

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header" style={{ backgroundColor: "#6f42c1", color: "white" }}>
          <h4>Create Template</h4>
        </div>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label" style={{ color: "#6f42c1" }}>
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter template name"
                style={{ borderColor: "#6f42c1" }}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label" style={{ color: "#6f42c1" }}>
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter description"
                style={{ borderColor: "#6f42c1" }}
              ></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="theme" className="form-label" style={{ color: "#6f42c1" }}>
                Theme
              </label>
              <select
                className="form-select"
                id="theme"
                name="theme"
                value={formData.theme}
                onChange={handleChange}
                style={{ borderColor: "#6f42c1" }}
              >
                <option value="" disabled>
                  Select a theme
                </option>
                <option value="data-science">Data Science</option>
                <option value="front">Frontend</option>
                <option value="back">Backend</option>
                <option value="devops">DevOps</option>
                <option value="database">Database</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label" style={{ color: "#6f42c1" }}>
                Public
              </label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="public"
                  id="publicYes"
                  value="yes"
                  checked={formData.public === true}
                  onChange={handleRadioChange}
                />
                <label className="form-check-label" htmlFor="publicYes" style={{ color: "#6f42c1" }}>
                  Yes
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="public"
                  id="publicNo"
                  value="no"
                  checked={formData.public === false}
                  onChange={handleRadioChange}
                />
                <label className="form-check-label" htmlFor="publicNo" style={{ color: "#6f42c1" }}>
                  No
                </label>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="image" className="form-label" style={{ color: "#6f42c1" }}>
                Image
              </label>
              <input
                className="form-control"
                type="file"
                id="image"
                name="image"
                onChange={handleFileChange}
              />
            </div>

            <button
              type="submit"
              className="btn btn-success w-100"
              style={{ backgroundColor: "#6f42c1", borderColor: "#6f42c1" }}
            >
              Create Template
            </button>
          </form>
        </div>
      </div>

      {/* Modal for creating questions */}
      {modalVisible && (
  <div className="modal fade show" tabIndex="-1" style={{ display: "block" }}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header" style={{ backgroundColor: "#6f42c4", color: "white" }}>
          <h5 className="modal-title">Create Question</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={() => setModalVisible(false)}
          ></button>
        </div>
        <div className="modal-body">
          {/* Question Name */}
          <div className="mb-3">
            <label htmlFor="questionName" className="form-label" style={{ color: "#6f42c1" }}>
              Question Name
            </label>
            <input
              type="text"
              className="form-control"
              id="questionName"
              name="name"
              value={questionData.name}
              onChange={handleQuestionChange}
              placeholder="Enter question name"
              style={{ borderColor: "#6f42c1" }}
            />
          </div>

          {/* Question Description */}
          <div className="mb-3">
            <label htmlFor="questionDescription" className="form-label" style={{ color: "#6f42c1" }}>
              Question Description
            </label>
            <textarea
              className="form-control"
              id="questionDescription"
              name="description"
              rows="3"
              value={questionData.description}
              onChange={handleQuestionChange}
              placeholder="Enter description"
              style={{ borderColor: "#6f42c1" }}
            ></textarea>
          </div>

          {/* Answer Type */}
          <div className="mb-3">
            <label htmlFor="answerType" className="form-label" style={{ color: "#6f42c1" }}>
              Answer Type
            </label>
            <select
              className="form-select"
              id="answerType"
              name="answerType"
              value={questionData.answerType}
              onChange={handleQuestionChange}
              style={{ borderColor: "#6f42c1" }}
            >
              <option value="checkbox">Checkbox</option>
              <option value="text">Text</option>
            </select>
          </div>

          {/* Show Answer Section */}
          <div className="mb-3">
            <label htmlFor="showAnswer" className="form-label" style={{ color: "#6f42c1" }}>
              Show Answer
            </label>
            <select
              className="form-select"
              id="showAnswer"
              name="showAnswer"
              value={questionData.showAnswer}
              onChange={(e) =>
                setQuestionData({ ...questionData, showAnswer: e.target.value })
              }
              style={{ borderColor: "#6f42c1" }}
            >
              <option value="1">True</option>
              <option value="0">False</option>
            </select>
          </div>

          {/* Dynamically Generate Answers */}
          {questionData.answerType === "checkbox" && (
            <div>
              {questionData.answers.map((answer, index) => (
                <div key={index} className="input-group mb-2 align-items-center">
                  <div className="input-group-text">
                    <input
                      type="checkbox"
                      checked={answer.selected}
                      onChange={() => handleCheckboxChange(index)}
                      className="form-check-input mt-0"
                    />
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    value={answer.text}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    placeholder={`Answer ${index + 1}`}
                    style={{ borderColor: "#6f42c1" }}
                  />
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleRemoveAnswer(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="btn btn-primary w-100"
                onClick={handleAddAnswer}
              >
                Add Answer
              </button>
            </div>
          )}

          {/* Save Button */}
          <button
            type="button"
            className="btn btn-success w-100 mt-3"
            onClick={handleQuestionSubmit}
          >
            Save Question
          </button>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
}

export default TemplateForm;  
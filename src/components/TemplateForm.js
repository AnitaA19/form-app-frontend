import { useState } from "react";
import axios from "axios";
import { useTranslation } from 'react-i18next';

function TemplateForm() {
  const { t } = useTranslation();
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
    show_answer: 0,
    answers: [{ id: 1, text: "", selected: false }]
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
    const newId = questionData.answers.length + 1;
    setQuestionData({
      ...questionData,
      answers: [...questionData.answers, { id: newId, text: "", selected: false }],
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
      setError(t("must_be_logged_in"));
      return;
    }

    if (!formData.name || !formData.description || !formData.theme) {
      setError(t("fill_required_fields"));
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
        `${process.env.REACT_APP_API_URL}/templates/create`,
        formDataToSend,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      const newTemplateId = response.data.template_id;
      if (newTemplateId) {
        setSuccess(t("template_created_successfully"));
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
        setError(t("failed_to_retrieve_template_id"));
      }
    } catch (error) {
      console.error("Error Response:", error.response ? error.response.data : error);
      setError(t("failed_to_create_template"));
    }
  };

  const handleQuestionSubmit = async () => {
    const correct_answer = questionData.answers
      .filter(answer => answer.selected)
      .map(answer => answer.id);

    if (correct_answer.length === 0 && questionData.answerType === "checkbox") {
      setError(t("select_at_least_one_correct_answer"));
      return;
    }

    const questionDataToSend = {
      template_id: templateId,
      name: questionData.name,
      description: questionData.description,
      answerType: questionData.answerType,
      show_answer: parseInt(questionData.show_answer),
      answers: questionData.answers.map(answer => answer.text),
      correct_answer: correct_answer
    };

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError(t("must_be_logged_in"));
        return;
      }

      await axios.post(
        `${process.env.REACT_APP_API_URL}/${templateId}/questions`,
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
        show_answer: 0,
        answers: [{ id: 1, text: "", selected: false }]
      });

      setModalVisible(false);
      setSuccess(t("question_created_successfully"));
      setError("");
    } catch (error) {
      console.error("API Error:", error.response ? error.response.data : error);
      setError(`${t("failed_to_create_question")}: ${error.response?.data?.message || t("unknown_error")}`);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header" style={{ backgroundColor: "#6f42c1", color: "white" }}>
          <h4>{t("create_template")}</h4>
        </div>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <form onSubmit={handleSubmit}>
            {/* Template Name */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">{t("question_name")}</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t("enter_template_name")}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">{t("description")}</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder={t("enter_description")}
                rows="3"
              ></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="theme" className="form-label">{t("theme")}</label>
              <select
                className="form-select"
                id="theme"
                name="theme"
                value={formData.theme}
                onChange={handleChange}
              >
                <option value="">{t("select_theme")}</option>
                <option value="data-science">{t("data_science")}</option>
                <option value="front">{t("frontend")}</option>
                <option value="back">{t("backend")}</option>
                <option value="devops">{t("devops")}</option>
                <option value="database">{t("database")}</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">{t("public")}</label>
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
                <label className="form-check-label" htmlFor="publicYes">{t("yes")}</label>
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
                <label className="form-check-label" htmlFor="publicNo">{t("no")}</label>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="image" className="form-label">{t("image")}</label>
              <input
                className="form-control"
                type="file"
                id="image"
                onChange={handleFileChange}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              {t("create_template")}
            </button>
          </form>
        </div>
      </div>

      {modalVisible && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{t("create_question")}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setModalVisible(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="questionName" className="form-label">{t("question_name")}</label>
                  <input
                    type="text"
                    className="form-control"
                    id="questionName"
                    name="name"
                    value={questionData.name}
                    onChange={handleQuestionChange}
                    placeholder={t("enter_question_name")}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="questionDescription" className="form-label">{t("description")}</label>
                  <textarea
                    className="form-control"
                    id="questionDescription"
                    name="description"
                    value={questionData.description}
                    onChange={handleQuestionChange}
                    placeholder={t("enter_description")}
                    rows="3"
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label htmlFor="answerType" className="form-label">{t("answer_type")}</label>
                  <select
                    className="form-select"
                    id="answerType"
                    name="answerType"
                    value={questionData.answerType}
                    onChange={handleQuestionChange}
                  >
                    <option value="checkbox">{t("checkbox")}</option>
                    <option value="text">{t("text")}</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="show_answer" className="form-label">{t("show_answer")}</label>
                  <select
                    className="form-select"
                    id="show_answer"
                    name="show_answer"
                    value={questionData.show_answer}
                    onChange={handleQuestionChange}
                  >
                    <option value={1}>{t("yes")}</option>
                    <option value={0}>{t("no")}</option>
                  </select>
                </div>

                {questionData.answerType === "checkbox" && (
                  <div>
                    {questionData.answers.map((answer, index) => (
                      <div key={answer.id} className="input-group mb-2">
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
                          placeholder={`${t("answer")} ${index + 1}`}
                        />
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => handleRemoveAnswer(index)}
                        >
                          {t("remove")}
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="btn btn-primary w-100"
                      onClick={handleAddAnswer}
                    >
                      {t("add_answer")}
                    </button>
                  </div>
                )}

                <button
                  type="button"
                  className="btn btn-success w-100 mt-3"
                  onClick={handleQuestionSubmit}
                >
                  {t("save_question")}
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
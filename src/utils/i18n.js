import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    lng: 'ru', 
    fallbackLng: 'en', 
    resources: {
      en: {
        translation: {
          "login": "Login",
          "email": "Email",
          "password": "Password",
          "log_in": "Log in",
          "no_account": "Don't have an account?",
          "have_account": "Already have an account?",
          "sign_up": "Sign up",
          "logging_in": "Logging in",
          "forms" : "Forms",
          "latest_forms": "Latest Forms",
          "add_form": "Add Form",
          "author": "Author",
          "no_forms_available": "No forms yet",
          "all_authors": "All authors",
          "edit": "Edit",
          "create_template": "Create Template",
          "gallery": "Gallery",
          "log_in_to_add_form": "Log in to add a form",
          "go_back_to_main_page": "Go back to the main page",
          "no_forms_click_to_add": "No forms. Click to add",
          "failed_to_fetch_questions": "Failed to fetch questions",
          "error_fetching_questions": "Error fetching questions",
          "question": "Question",
          "description": "Description",
          "answer_type": "Answer Type",
          "show_answer": "Show Answer",
          "answers": "Answers",
          "add_answer": "Add Answer",
          "correct": "Correct",
          "save": "Save",
          "delete": "Delete",
          "edit_question": "Edit Question",
          "question_name": "Question Name",
          "question_description": "Question Description",
          "question_answer_type": "Question Answer Type",
          "question_show_answer": "Question Show Answer",
          "question_answers": "Question Answers",
          "question_correct": "Question Correct",
          "question_selected": "Question Selected",
          "question_text": "Question Text",
          "question_correct_answer": "Question Correct Answer",
          "question_selected_answer": "Question Selected Answer",
          "question_add_answer": "Question Add Answer",
          "question_save": "Question Save",
          "question_delete": "Question Delete",
          "question_edit": "Question Edit",
          "question_create": "Question Create",
          "question_list": "Question List",
          "question_form": "Question Form",
          "question_template": "Question Template",
          "question_crud": "Question CRUD",
          "question_form_list": "Question Form List",
          "question_template_list": "Question Template List",
          "question_template_crud": "Question Template CRUD",
          "question_template_create": "Question Template Create",
          "question_template_edit": "Question Template Edit",
          "question_template_delete": "Question Template Delete",
          "question_template_show": "Question Template Show",
          "question_template_add": "Question Template Add",
          "question_template_remove": "Question Template Remove",
          "question_template_update": "Question Template Update",
          "question_template_fetch": "Question Template Fetch",
          "question_template_error": "Question Template Error",
          "question_template_failed": "Question Template Failed",
          "question_template_success": "Question Template Success",
          "question_template_warning": "Question Template Warning",
          "question_template_info": "Question Template Info",
          "question_template_close": "Question Template Close",
          "question_template_open": "Question Template Open",
          "question_template_save": "Question Template Save",
          "question_template_cancel": "Question Template Cancel",
          "question_template_confirm": "Question Template Confirm",
          "question_template_prompt": "Question Template Prompt",
          "question_template_accept": "Question Template Accept",
          "question_template_reject": "Question Template Reject",
          "question_template_delete_question": "Question Template Delete Question",
          "question_template_delete_template": "Question Template Delete Template",
          "question_template_delete_confirm": "Question Template Delete Confirm",
          "question_template_delete_cancel": "Question Template Delete Cancel",
          "question_template_delete_accept": "Question Template Delete Accept",
          "question_template_delete_reject": "Question Template Delete Reject",
          "question_template_delete_success": "Question Template Delete Success",
          "question_template_delete_failed": "Question Template Delete Failed",
          "question_template_delete_warning": "Question Template Delete Warning",
          "question_template_delete_info": "Question Template Delete Info",
          "question_template_delete_close": "Question Template Delete Close",
          "question_template_delete_open": "Question Template Delete Open",
          "question_template_delete_save": "Question Template Delete Save",
          "enter_template_name": "Enter template name",
          "enter_description": "Enter description",
          "theme": "Theme",
          "select_theme": "Select theme",
          "public": "Public",
          "yes": "Yes",
          "no": "No",
          "image": "Image",
          "choose_file": "Choose file",
          "no_file_chosen": "No file chosen",
          "template_created_successfully": "Template created successfully",
          "enter_question_name": "Enter question name",
          "answer 1": "Answer 1",
          "save question": "Save question",
          "select_answer_type": "Select answer type",
          "select_at_least_one_correct_answer": "Select at least one correct answer",
          "select_at_least_one_selected_answer": "Select at least one selected answer",
          "remove": "Remove",
          "question_created_successfully": "Question created successfully",
          "question_deleted_successfully": "Question deleted successfully",
          "question_updated_successfully": "Question updated successfully",
          "question_fetched_successfully": "Question fetched successfully",
          "question_template_deleted_successfully": "Question template deleted successfully",
          "question_template_updated_successfully": "Question template updated successfully",
          "question_template_fetched_successfully": "Question template fetched successfully",
          "question_template_created_successfully": "Question template created successfully",
          "fill_required_fields": "Fill required fields",
          "failed_to_create_question": "Failed to create question",
          "failed_to_delete_question": "Failed to delete question",
          "failed_to_fetch_question": "Failed to fetch question",
          "failed_to_update_question": "Failed to update question",
          "failed_to_create_template": "Failed to create template",
          "answer 2": "Answer 2",
          "answer 3": "Answer 3",
          "your_answer": "Your answer",
          "your_questions": "Your question",
          "failed_to_delete_template": "Failed to delete template",
          "failed_to_fetch_template": "Failed to fetch template",
          "failed_to_update_template": "Failed to update template",
          "template_updated_successfully": "Template updated successfully",
          "failed_to_create_form": "Failed to create form",
          "failed_to_delete_form": "Failed to delete form",
          "failed_to_fetch_form": "Failed to fetch form",
          "failed_to_update_form": "Failed to update form",
          "form_updated_successfully": "Form updated successfully",
          "form_created_successfully": "Form created successfully",
          "form_deleted_successfully": "Form deleted successfully",
          "form_fetched_successfully": "Form fetched successfully",
          "template_deleted_successfully": "Template deleted successfully",
          "template_fetched_successfully": "Template fetched successfully",
          "update_template": "Update Template",
          "delete_template": "Delete Template",
          "edit_template": "Edit Template",
          "logout": "Logout",
          "welcome": "Welcome",
          "search": "Search",
        }
      },
      ru: {
        translation: {
          "login": "Войти",
          "email": "Электронная почта",
          "password": "Пароль",
          "log_in": "Войти",
          "no_account": "Нет аккаунта?",
          "have_account": "Уже есть аккаунт?",
          "sign_up": "Зарегистрироваться",
          "logging_in": "Вход...",
          "forms" : "Формы",
          "latest_forms": "Последние формы",
          "add_form": "Добавить форму",
          "author": "Автор",
          "no_forms_available": "Пока нет форм",
          "all_authors": "Все авторы",
          "edit": "Редактировать",
          "create_template": "Создать шаблон",
          "gallery": "Галерея",
          "log_in_to_add_form": "Войдите, чтобы добавить форму",
          "go_back_to_main_page": "Вернитесь на главную страницу",
          "no_forms_click_to_add": "Нет форм. Нажмите, чтобы добавить",
          "failed_to_fetch_questions": "Не удалось получить вопросы",
          "error_fetching_questions": "Ошибка при получении вопросов",
          "question": "Вопрос",
          "description": "Описание",
          "answer_type": "Тип ответа",
          "show_answer": "Показать ответ",
          "answers": "Ответы",
          "add_answer": "Добавить ответ",
          "correct": "Правильный",
          "save": "Сохранить",
          "delete": "Удалить",
          "edit_question": "Редактировать вопрос",
          "question_name": "Имя вопроса",
          "question_description": "Описание вопроса",
          "question_answer_type": "Тип ответа на вопрос",
          "question_show_answer": "Показать ответ на вопрос",
          "question_answers": "Ответы на вопрос",
          "question_correct": "Правильный ответ на вопрос",
          "question_selected": "Выбранный ответ на вопрос",
          "question_text": "Текст вопроса",
          "question_correct_answer": "Правильный ответ на вопрос",
          "question_selected_answer": "Выбранный ответ на вопрос",
          "question_add_answer": "Добавить ответ на вопрос",
          "question_save": "Сохранить вопрос",
          "question_delete": "Удалить вопрос",
          "question_edit": "Редактировать вопрос",
          "question_create": "Создать вопрос",
          "question_list": "Список вопросов",
          "question_form": "Форма вопроса",
          "question_template": "Шаблон вопроса",
          "question_crud": "CRUD вопроса",
          "question_form_list": "Список форм вопросов",
          "question_template_list": "Список шаблонов вопросов",
          "question_template_crud": "CRUD шаблона вопросов",
          "question_template_create": "Создать шаблон вопросов",
          "question_template_edit": "Редактировать шаблон вопросов",
          "question_template_delete": "Удалить шаблон вопросов",
          "question_template_show": "Показать шаблон вопросов",
          "question_template_add": "Добавить шаблон вопросов",
          "question_template_remove": "Удалить шаблон вопросов",
          "question_template_update": "Обновить шаблон вопросов",
          "question_template_fetch": "Получить шаблон вопросов",
          "question_template_error": "Ошибка шаблона вопросов",
          "question_template_failed": "Ошибка шаблона вопросов",
          "question_template_success": "Успех шаблона вопросов",
          "question_template_warning": "Предупреждение шаблона вопросов",
          "question_template_info": "Информация шаблона вопросов",
          "question_template_close": "Закрыть шаблон вопросов",
          "question_template_open": "Открыть шаблон вопросов",
          "question_template_save": "Сохранить шаблон вопросов",
          "question_template_cancel": "Отменить шаблон вопросов",
          "question_template_confirm": "Подтвердить шаблон вопросов",
          "question_template_prompt": "Подсказка шаблона вопросов",
          "question_template_accept": "Принять шаблон вопросов",
          "question_template_reject": "Отклонить шаблон вопросов",
          "question_template_delete_question": "Удалить",
          "question_template_delete_template": "Удалить",
          "question_template_delete_confirm": "Удалить",
          "question_template_delete_cancel": "Отменить",
          "question_template_delete_accept": "Принять",
          "question_template_delete_reject": "Отклонить",
          "question_template_delete_success": "Успех",
          "question_template_delete_failed": "Ошибка",
          "question_template_delete_warning": "Предупреждение",
          "question_template_delete_info": "Информация",
          "question_template_delete_close": "Закрыть",
          "question_template_delete_open": "Открыть",
          "question_template_delete_save": "Сохранить",
          "enter_template_name": "Введите имя шаблона",
          "enter_description": "Введите описание",
          "theme": "Тема",
          "select_theme": "Выберите тему",
          "public": "Публичный",
          "yes": "Да",
          "no": "Нет",
          "image": "Изображение",
          "choose_file": "Выберите файл",
          "no_file_chosen": "Файл не выбран",
          "template_created_successfully": "Шаблон успешно создан",
          "enter_question_name": "Введите имя вопроса",
          "answer 1": "Ответ 1",
          "save question": "Сохранить вопрос",
          "select_answer_type": "Выберите тип ответа",
          "select_at_least_one_correct_answer": "Выберите хотя бы один правильный ответ",
          "select_at_least_one_selected_answer": "Выберите хотя бы один выбранный ответ",
          "remove": "Удалить",
          "question_created_successfully": "Вопрос успешно создан",
          "question_deleted_successfully": "Вопрос успешно удален",
          "question_updated_successfully": "Вопрос успешно обновлен",
          "question_fetched_successfully": "Вопрос успешно получен",
          "question_template_deleted_successfully": "Шаблон вопроса успешно удален",
          "question_template_updated_successfully": "Шаблон вопроса успешно обновлен",
          "question_template_fetched_successfully": "Шаблон вопроса успешно получен",
          "question_template_created_successfully": "Шаблон вопроса успешно создан",
          "fill_required_fields": "Заполните обязательные поля",
          "failed_to_create_question": "Не удалось создать вопрос",
          "failed_to_delete_question": "Не удалось удалить вопрос",
          "failed_to_fetch_question": "Не удалось получить вопрос",
          "failed_to_update_question": "Не удалось обновить вопрос",
          "failed_to_create_template": "Не удалось создать шаблон",
          "answer 2": "Ответ 2",
          "answer 3": "Ответ 3",
          "your_answer": "Ваш ответ",
          "your_questions": "Ваш вопрос",
          "failed_to_delete_template": "Не удалось удалить шаблон",
          "failed_to_fetch_template": "Не удалось получить шаблон",
          "failed_to_update_template": "Не удалось обновить шаблон",
          "template_updated_successfully": "Шаблон успешно обновлен",
          "failed_to_create_form": "Не удалось создать форму",
          "failed_to_delete_form": "Не удалось удалить форму",
          "failed_to_fetch_form": "Не удалось получить форму",
          "failed_to_update_form": "Не удалось обновить форму",
          "form_updated_successfully": "Форма успешно обновлена",
          "form_created_successfully": "Форма успешно создана",
          "form_deleted_successfully": "Форма успешно удалена",
          "form_fetched_successfully": "Форма успешно получена",
          "template_deleted_successfully": "Шаблон успешно удален",
          "template_fetched_successfully": "Шаблон успешно получен",
          "update_template": "Обновить шаблон",
          "delete_template": "Удалить шаблон",
          "edit_template": "Редактировать шаблон",
          "logout": "Выйти",
          "welcome": "Добро пожаловать",
          "search": "Поиск",
        }
      },
      es: {
        translation: {
          "login": "Iniciar sesión",
          "email": "Correo electrónico",
          "password": "Contraseña",
          "log_in": "Iniciar sesión",
          "no_account": "¿No tienes una cuenta?",
          "have_account": "¿Ya tienes una cuenta?",
          "sign_up": "Regístrate",
          "logging_in": "Iniciando sesión...",
          "forms": "Formularios",
          "latest_forms": "Últimos formularios",
          "add_form": "Agregar formulario",
          "author": "Autor",
          "no_forms_available": "Aún no hay formularios",
          "all_authors": "Todos los autores",
          "edit": "Editar",
          "create_template": "Crear plantilla",
          "gallery": "Galería",
          "log_in_to_add_form": "Inicia sesión para agregar un formulario",
          "go_back_to_main_page": "Vuelve a la página principal",
          "no_forms_click_to_add": "No hay formularios. Haz clic para agregar",
          "failed_to_fetch_questions": "Error al obtener preguntas",
          "error_fetching_questions": "Error al obtener preguntas",
          "question": "Pregunta",
          "description": "Descripción",
          "answer_type": "Tipo de respuesta",
          "show_answer": "Mostrar respuesta",
          "answers": "Respuestas",
          "add_answer": "Agregar respuesta",
          "correct": "Correcto",
          "save": "Guardar",
          "delete": "Eliminar",
          "edit_question": "Editar pregunta",
          "question_name": "Nombre de la pregunta",
          "question_description": "Descripción de la pregunta",
          "question_answer_type": "Tipo de respuesta de la pregunta",
          "question_show_answer": "Mostrar respuesta de la pregunta",
          "question_answers": "Respuestas de la pregunta",
          "question_correct": "Respuesta correcta de la pregunta",
          "question_selected": "Respuesta seleccionada de la pregunta",
          "question_text": "Texto de la pregunta",
          "question_correct_answer": "Respuesta correcta de la pregunta",
          "question_selected_answer": "Respuesta seleccionada de la pregunta",
          "question_add_answer": "Agregar respuesta de la pregunta",
          "question_save": "Guardar pregunta",
          "question_delete": "Eliminar pregunta",
          "question_edit": "Editar pregunta",
          "question_create": "Crear pregunta",
          "question_list": "Lista de preguntas",
          "question_form": "Formulario de preguntas",
          "question_template": "Plantilla de preguntas",
          "question_crud": "CRUD de preguntas",
          "question_form_list": "Lista de formularios de preguntas",
          "question_template_list": "Lista de plantillas de preguntas",
          "question_template_crud": "CRUD de plantillas de preguntas",
          "question_template_create": "Crear plantilla de preguntas",
          "question_template_edit": "Editar plantilla de preguntas",
          "question_template_delete": "Eliminar plantilla de preguntas",
          "question_template_show": "Mostrar plantilla de preguntas",
          "question_template_add": "Agregar plantilla de preguntas",
          "question_template_remove": "Eliminar plantilla de preguntas",
          "question_template_update": "Actualizar plantilla de preguntas",
          "question_template_fetch": "Obtener plantilla de preguntas",
          "question_template_error": "Error de plantilla de preguntas",
          "question_template_failed": "Error de plantilla de preguntas",
          "question_template_success": "Éxito de plantilla de preguntas",
          "question_template_warning": "Advertencia de plantilla de preguntas",
          "question_template_info": "Información de plantilla de preguntas",
          "question_template_close": "Cerrar plantilla de preguntas",
          "question_template_open": "Abrir plantilla de preguntas",
          "question_template_save": "Guardar plantilla de preguntas",
          "question_template_cancel": "Cancelar plantilla de preguntas",
          "question_template_confirm": "Confirmar plantilla de preguntas",
          "question_template_prompt": "Sugerencia de plantilla de preguntas",
          "question_template_accept": "Aceptar plantilla de preguntas",
          "question_template_reject": "Rechazar plantilla de preguntas",
          "question_template_delete_question": "Eliminar",
          "question_template_delete_template": "Eliminar",
          "question_template_delete_confirm": "Eliminar",
          "question_template_delete_cancel": "Cancelar",
          "question_template_delete_accept": "Aceptar",
          "question_template_delete_reject": "Rechazar",
          "question_template_delete_success": "Éxito",
          "question_template_delete_failed": "Error",
          "question_template_delete_warning": "Advertencia",
          "question_template_delete_info": "Información",
          "question_template_delete_close": "Cerrar",
          "question_template_delete_open": "Abrir",
          "question_template_delete_save": "Guardar",
          "enter_template_name": "Introduzca el nombre de la plantilla",
          "enter_description": "Introduzca la descripción",
          "theme": "Tema",
          "select_theme": "Seleccionar tema",
          "public": "Público",
          "yes": "Sí",
          "no": "No",
          "image": "Imagen",
          "choose_file": "Elegir archivo",
          "no_file_chosen": "Ningún archivo seleccionado",
          "template_created_successfully": "Plantilla creada con éxito",
          "enter_question_name": "Introduzca el nombre de la pregunta",
          "answer 1": "Respuesta 1",
          "save question": "Guardar pregunta",
          "select_answer_type": "Seleccionar tipo de respuesta",
          "select_at_least_one_correct_answer": "Seleccionar al menos una respuesta correcta",
          "select_at_least_one_selected_answer": "Seleccionar al menos una respuesta seleccionada",
          "remove": "Eliminar",
          "question_created_successfully": "Pregunta creada con éxito",
          "question_deleted_successfully": "Pregunta eliminada con éxito",
          "question_updated_successfully": "Pregunta actualizada con éxito",
          "question_fetched_successfully": "Pregunta obtenida con éxito",
          "question_template_deleted_successfully": "Plantilla de pregunta eliminada con éxito",
          "question_template_updated_successfully": "Plantilla de pregunta actualizada con éxito",
          "question_template_fetched_successfully": "Plantilla de pregunta obtenida con éxito",
          "question_template_created_successfully": "Plantilla de pregunta creada con éxito",
          "fill_required_fields": "Rellene los campos obligatorios",
          "failed_to_create_question": "Error al crear la pregunta",
          "failed_to_delete_question": "Error al eliminar la pregunta",
          "failed_to_fetch_question": "Error al obtener la pregunta",
          "failed_to_update_question": "Error al actualizar la pregunta",
          "failed_to_create_template": "Error al crear la plantilla",
          "answer 2": "Respuesta 2",
          "answer 3": "Respuesta 3",
          "your_answer": "Tu respuesta",
          "your_questions": "Tu pregunta",
          "failed_to_delete_template": "Error al eliminar la plantilla",
          "failed_to_fetch_template": "Error al obtener la plantilla",
          "failed_to_update_template": "Error al actualizar la plantilla",
          "template_updated_successfully": "Plantilla actualizada con éxito",
          "failed_to_create_form": "Error al crear el formulario",
          "failed_to_delete_form": "Error al eliminar el formulario",
          "failed_to_fetch_form": "Error al obtener el formulario",
          "failed_to_update_form": "Error al actualizar el formulario",
          "form_updated_successfully": "Formulario actualizado con éxito",
          "form_created_successfully": "Formulario creado con éxito",
          "form_deleted_successfully": "Formulario eliminado con éxito",
          "form_fetched_successfully": "Formulario obtenido con éxito",
          "template_deleted_successfully": "Plantilla eliminada con éxito",
          "template_fetched_successfully": "Plantilla obtenida con éxito",
          "update_template": "Actualizar plantilla",
          "delete_template": "Eliminar plantilla",
          "edit_template": "Editar plantilla",
          "logout": "Cerrar sesión",
          "welcome": "Bienvenido",
          "search": "Buscar",
        }
      }
    },
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;

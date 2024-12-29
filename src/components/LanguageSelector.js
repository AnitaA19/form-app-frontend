import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function LanguageSelector() {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const changeLanguage = (lng) => {
    console.log(`Changing language to: ${lng}`);
    i18n.changeLanguage(lng);
    setSelectedLanguage(lng);
  };
  

  useEffect(() => {
    setSelectedLanguage(i18n.language);
  }, [i18n.language]);

  return (
    <div className="language-selector">
      <select
        onChange={(e) => changeLanguage(e.target.value)}
        value={selectedLanguage}
      >
        <option value="en">English</option>
        <option value="es">Español</option>
        <option value="ru">Русский</option>
      </select>
    </div>
  );
}

export default LanguageSelector;
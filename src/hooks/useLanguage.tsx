
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

const useLanguage = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  
  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      setLanguage(lng);
    };

   
    i18n.on('languageChanged', handleLanguageChange);

   
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  const changeLanguage = (lng: string ) => {
    i18n.changeLanguage(lng);
  };

  return { language, changeLanguage };
};

export default useLanguage;

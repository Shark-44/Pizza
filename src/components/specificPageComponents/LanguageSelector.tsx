import frIcon from "../../assets/images/fr.svg"; 
import itIcon from "../../assets/images/it.svg"; 
import gbIcon from "../../assets/images/gb.svg"; 
import BtnFlag from '../aggregate/BtnFlag'; 
import i18next from 'i18next';

const LanguageSelector = () => {
  const handleLanguageChange = (lang: string | undefined) => {
    i18next.changeLanguage(lang);
    console.log(`Langue changée à: ${lang}`);
  };

  return (
    <div className="flex mt-7 gap-4">
      <BtnFlag icon={frIcon} lang="fr" onClick={() => handleLanguageChange('fr')} />
      <BtnFlag icon={itIcon} lang="it" onClick={() => handleLanguageChange('it')} />
      <BtnFlag icon={gbIcon} lang="gb" onClick={() => handleLanguageChange('gb')} />
    </div>
  );
};

export default LanguageSelector;

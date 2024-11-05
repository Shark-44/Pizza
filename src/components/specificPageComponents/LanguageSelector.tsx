
import frIcon from "../../assets/images/fr.svg"; 
import itIcon from "../../assets/images/it.svg"; 
import gbIcon from "../../assets/images/gb.svg"; 
import BtnFlag from '../aggregate/BtnFlag'; 

const LanguageSelector = () => {
  const handleLanguageChange = (lang: string) => {
    
    console.log(`Langue changée à: ${lang}`);
  };

  return (
    <div className="flex mt-7 gap-4">
      <BtnFlag icon={frIcon} lang="fr" onClick={handleLanguageChange} />
      <BtnFlag icon={itIcon} lang="it" onClick={handleLanguageChange} />
      <BtnFlag icon={gbIcon} lang="gb" onClick={handleLanguageChange} />
    </div>
  );
};

export default LanguageSelector;

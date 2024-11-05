
import { BtnFlag } from "../../types/types"; 

const BtnFlagComponent = ({ icon, lang, onClick }: BtnFlag) => {
    return (
        <button
            onClick={() => onClick(lang)} 
            className="h-12 w-36 rounded-md flex items-center justify-center transition-colors duration-200"
            aria-label={lang}
            style={{
                backgroundImage: `url(${icon})`, 
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        ></button>
    );
};

export default BtnFlagComponent;

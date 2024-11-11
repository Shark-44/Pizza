import { useState } from "react";
import { TranslationItem } from "../types/types";

const useTranslationData = () => {
    const [translationData, setTranslationData] = useState<TranslationItem>({
        fr: { nomproduit: "", descriptionProduit: "" },
        gb: { nomproduit: "", descriptionProduit: "" },
        it: { nomproduit: "", descriptionProduit: "" },
    });

    const handleTranslationChange = (languageCode: string, field: string, value: string) => {
        setTranslationData((prevData) => ({
            ...prevData,
            [languageCode]: {
                ...prevData[languageCode],
                [field]: value,
            },
        }));
    };

    return { translationData, handleTranslationChange };
};

export default useTranslationData;

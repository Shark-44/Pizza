import { useState, useEffect } from "react";
import { fetchTypes } from "../api/typeService";
import { Type } from "../types/types";

const useFetchTypes = (language: string) => {
    const [types, setTypes] = useState<Type[]>([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetchTypes(language);
                setTypes(res);
            } catch (error) {
                console.error("Erreur lors de la récupération des types", error);
            }
        };

        fetchData();
    }, [language]);

    return types;
};

export default useFetchTypes;

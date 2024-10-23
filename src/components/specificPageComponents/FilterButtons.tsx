import Button from "../aggregate/button";
import { fetchTypes } from "../../api/typeService";
import { Type } from '../../types/types';

import { useEffect, useState } from "react";

interface FilterButtonsProps {
    setIdType: (id: number) => void;
}

function FilterButtons ({ setIdType }: FilterButtonsProps) {
    const [types, setTypes] = useState<Type[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetchTypes();          
                setTypes(res);
            } catch (error) {
                console.error("Erreur lors de la récupération des types", error);
            }
        };
   
        fetchData();
    }, []);

    const handleButtonClick = (typeId: number) => {
        setIdType(typeId);  
    };

    return (
        <>
            {types.map((type) => (
                <Button 
                    key={type.id} 
                    label={type.nomtype} 
                    onClick={() => handleButtonClick(type.id)} 
                    className={"font-satisfy bg-customOrange text-xl"}
                />
            ))}
        </>
    );
}

export default FilterButtons;

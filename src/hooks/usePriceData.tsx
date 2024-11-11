import { useState, ChangeEvent } from "react";

const usePriceData = () => {
    const [priceData, setPriceData] = useState({
        dateprix: new Date().toISOString().split("T")[0], 
        ancienPrix: 0,
        nouveauPrix: 0
    });

    const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value);
        setPriceData((prev) => ({
            ...prev,
            ancienPrix: value,
            nouveauPrix: value  
        }));
    };

    return { priceData, handlePriceChange };
};

export default usePriceData;

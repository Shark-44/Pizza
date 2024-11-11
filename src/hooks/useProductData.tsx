import { useState, ChangeEvent } from "react";

const useProductData = () => {
    const [productData, setProductData] = useState({
        photoProduit: "",
        carte: false,
        type_id: "",
        photoPrevisuale: "",
        photoFile: null as File | null,
    });



    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setProductData((prevData) => ({
                ...prevData,
                photoPrevisuale: URL.createObjectURL(file),
                photoFile: file
            }));
        }
    };

    return { productData, setProductData, handleImageUpload };
};

export default useProductData;

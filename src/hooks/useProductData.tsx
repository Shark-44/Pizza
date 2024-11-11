import { useState, ChangeEvent } from "react";

const useProductData = (types: { id: number; nomtype: string }[]) => {
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
            const selectedType = types.find(type => type.id === Number(productData.type_id));
            const dossier = selectedType ? selectedType.nomtype : "default";
            const fileName = file.name;
            const fullPath = `/assets/images/${dossier}/${fileName}`;
            
            setProductData((prevData) => ({
                ...prevData,
                photoProduit: fullPath,
                photoPrevisuale: URL.createObjectURL(file),
                photoFile: file
            }));
        }
    };

    return { productData, setProductData, handleImageUpload };
};

export default useProductData;

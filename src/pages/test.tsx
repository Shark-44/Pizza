import { useState, ChangeEvent, FormEvent } from "react";
import instance from "../api/axiosInstance";

const Test = () => {
    const [formData, setFormData] = useState({
        photo: "",
        photoPrevisuale: "",
        photoFile: null as File | null,
    });

    const uploadImage = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setFormData({
                ...formData,
                photo: file.name,
                photoPrevisuale: URL.createObjectURL(file),
                photoFile: file,
            });
        }
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
    
        if (!formData.photoFile) {
            console.error("Aucune image sélectionnée !");
            return;
        }
    
        const formDataToSend = new FormData();
        formDataToSend.append("myfile", formData.photoFile);  
    
        const dossier = "test";
    
        try {
            const response = await instance.post(`/upload/${dossier}`, formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("Image envoyée avec succès :", response.data);
        } catch (error) {
            console.error("Erreur lors de l'envoi de l'image :", error);
        }
    };
    

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-8 bg-white shadow-md rounded-lg">
            {/* Image upload */}
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Photo du produit</label>
                <input
                    type="file"
                    name="photoProduit"
                    accept="image/*"
                    onChange={uploadImage}
                    className="w-full p-2 border border-gray-300 rounded"
                />
                {formData.photoPrevisuale && (
                    <div className="mt-4">
                        <img
                            src={formData.photoPrevisuale}
                            alt="Prévisualisation"
                            className="w-48 h-48 object-contain border rounded"
                        />
                    </div>
                )}
            </div>
            <button
                type="submit"
                className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
            >
                Envoyer une image.
            </button>
        </form>
    );
};

export default Test;

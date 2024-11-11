import { useState, ChangeEvent } from "react";
import useFetchTypes from "../hooks/useFetchTypes"
import useProductData from "../hooks/useProductData";
import useTranslationData from "../hooks/useTranslationData";
import usePriceData from "../hooks/usePriceData";
import { creatproduct } from "../api/productService";
import instance from "../api/axiosInstance";

const CreateProduct = () => {
     const types = useFetchTypes("fr");
    const { productData, setProductData, handleImageUpload } = useProductData();
    const { translationData, handleTranslationChange } = useTranslationData();
    const { priceData, handlePriceChange } = usePriceData();
    const [selectedOption, setSelectedOption] = useState(productData.type_id || "");

    const handleOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setSelectedOption(value);
        setProductData((prev) => ({ ...prev, type_id: value }));
    };

    const formatTranslationsForBackend = (): { language_code: string; nomproduit: string; descriptionProduit: string }[] => {
        return Object.entries(translationData).map(([languageCode, data]) => ({
            language_code: languageCode, 
            nomproduit: data.nomproduit,
            descriptionProduit: data.descriptionProduit
        }));
    };

    const handleImageUploadToServer = async (file: File | null, typeId: string) => {
        if (!file) return null;
    
        const formDataToSend = new FormData();
        formDataToSend.append("myfile", file);
    
        const selectedType = types.find(type => type.id === Number(typeId));
        const dossier = selectedType ? selectedType.nomtype : "default";
    
        try {
            const response = await instance.post(`/upload/${dossier}`, formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("Image envoyée avec succès :", response.data);
            return response.data.imageUrl; 
        } catch (error) {
            console.error("Erreur lors de l'envoi de l'image :", error);
            return null;
        }
    };
    
    const handleSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
    
        try {
            
            const imageUrl = productData.photoFile
                ? await handleImageUploadToServer(productData.photoFile, productData.type_id)
                : "";
                
            const formattedProduct = {
                ...productData,
                carte: productData.carte ? 1 : 0,
                type_id: Number(productData.type_id),
                photoProduit: imageUrl || productData.photoProduit 
            };
                
            const requestData = {
                price: priceData,
                product: formattedProduct,
                translations: formatTranslationsForBackend()
            };
    
            console.log("Données envoyées au backend:", requestData);
               
            const response = await creatproduct(
                requestData.price,
                requestData.product,
                requestData.translations
            );
            console.log(response)
            alert("Produit créé avec succès !");
        } catch (error) {
            console.error("Erreur lors de la création du produit", error);
        }
    };
    
    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-8 bg-white shadow-md rounded-lg">
            {/* Type selection */}
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Type de produit</label>
                <select
                    value={selectedOption}
                    onChange={handleOptionChange}
                    className="w-full p-2 border border-gray-300 rounded"
                >
                    <option value="">Sélectionner un type</option>
                    {types.map((type) => (
                        <option key={type.id} value={type.id}>
                            {type.nomtype}
                        </option>
                    ))}
                </select>
            </div>

            {/* Image upload */}
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Photo du produit</label>
                <input
                    type="file"
                    name="photoProduit"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full p-2 border border-gray-300 rounded"
                />
                {productData.photoPrevisuale && (
                    <div className="mt-4">
                        <img
                            src={productData.photoPrevisuale}
                            alt="Prévisualisation"
                            className="w-48 h-48 object-contain border rounded"
                        />
                    </div>
                )}
            </div>

            {/* Card display option */}
            <div className="mb-4">
                <label className="inline-flex items-center text-gray-700 text-sm font-bold">
                    <input
                        type="checkbox"
                        name="carte"
                        checked={productData.carte}
                        onChange={(e) => setProductData((prev) => ({ ...prev, carte: e.target.checked }))}
                        className="mr-2"
                    />
                    Afficher dans la carte
                </label>
            </div>

            {/* Translations */}
            <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-4">Nom du produit et les traductions</h3>
            {["fr", "gb", "it"].map((lang) => (
                <div key={lang} className="mb-4">
                    <h4 className="text-md font-bold text-gray-700 mb-2">Langue : {lang.toUpperCase()}</h4>
                    <input
                        type="text"
                        placeholder={`Nom du produit (${lang.toUpperCase()})`}
                        value={translationData[lang].nomproduit}
                        onChange={(e) => handleTranslationChange(lang, "nomproduit", e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded mb-2"
                    />
                    <textarea
                        placeholder={`Description du produit (${lang.toUpperCase()})`}
                        value={translationData[lang].descriptionProduit}
                        onChange={(e) => handleTranslationChange(lang, "descriptionProduit", e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
            ))}

            {/* Price */}
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Prix du produit</label>
                <input
                    type="number"
                    name="prix"
                    placeholder="Prix du produit"
                    value={priceData.nouveauPrix}  
                    onChange={handlePriceChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    min="0"
                    step="0.01"
                />
            </div>

            <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">
                Créer le Produit
            </button>
        </form>
    );
};

export default CreateProduct;
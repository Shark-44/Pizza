import { useState, useEffect, ChangeEvent } from "react";
import { fetchTypes } from "../api/typeService";
import { Type } from "../types/types";
import { creatproduct } from "../api/productService";

interface TranslationItem {
    language_code: string;
    nomproduit: string;
    descriptionProduit: string;
}
//test
const date: Date = new Date();
const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'numeric', day: '2-digit' };
const customFormattedDate: string = date.toLocaleDateString('fr-FR', options);
console.log(customFormattedDate);


const CreateProduct = () => {
    const [types, setTypes] = useState<Type[]>([]);
    const [selectedOption, setSelectedOption] = useState("");
    const language = "fr";

    const [productData, setProductData] = useState({
        photoProduit: "",
        carte: false,
        type_id: "",
        photoPrevisuale: ""
    });

    const [translationData, setTranslationData] = useState({
        fr: { nomproduit: "", descriptionProduit: "" },
        gb: { nomproduit: "", descriptionProduit: "" },
        it: { nomproduit: "", descriptionProduit: "" }
    });

    const [priceData, setPriceData] = useState({
        dateprix: customFormattedDate,
        ancienPrix: 0,
        nouveauPrix: 0
    });

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
    }, []);

    const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedTypeId = event.target.value;
        setSelectedOption(selectedTypeId);
        setProductData((prev) => ({ ...prev, type_id: selectedTypeId }));
    };

    const handleTranslationChange = (languageCode: string, field: string, value: string) => {
        setTranslationData((prevData) => ({
            ...prevData,
            [languageCode]: {
                ...prevData[languageCode],
                [field]: value
            }
        }));
    };

    const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value);
        setPriceData((prev) => ({
            ...prev,
            ancienPrix: value,
            nouveauPrix: value  
        }));
    };


    const formatTranslationsForBackend = (): TranslationItem[] => {
        return Object.entries(translationData).map(([language_code, data]) => ({
            language_code,
            nomproduit: data.nomproduit,
            descriptionProduit: data.descriptionProduit
        }));
    };

    const handleSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            // Format the product data
            const formattedProduct = {
                ...productData,
                carte: productData.carte ? 1 : 0,
                type_id: Number(productData.type_id)
            };

            // Create the request data
            const requestData = {
                price: priceData,
                product: formattedProduct,
                translations: formatTranslationsForBackend()
            };

            console.log('Données envoyées au backend:', requestData);

            const response = await creatproduct(
                requestData.price,
                requestData.product,
                requestData.translations
            );
            
            alert("Produit créé avec succès !");
        } catch (error) {
            console.error("Erreur lors de la création du produit", error);
        }
    };

    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setProductData((prevData) => ({
                ...prevData,
                photoProduit: file.name,
                photoPrevisuale: URL.createObjectURL(file)
            }));
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
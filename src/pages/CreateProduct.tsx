import { useState, useEffect, useRef, ChangeEvent } from "react";
import { fetchTypes } from "../api/typeService";
import { Type } from "../types/types";


const CreateProduct = () => {
    const [types, setTypes] = useState<Type[]>([]);
    const [selectedOption, setSelectedOption] = useState("");
    const language = "fr";

    const [productData, setProductData] = useState({
        photoProduit: "",
        carte: false,
        type_id: "",
        prix_id: ""
    });

    const [translationData, setTranslationData] = useState({
        fr: { nomProduit: "", descriptionProduit: "" },
        gb: { nomProduit: "", descriptionProduit: "" },
        it: { nomProduit: "", descriptionProduit: "" }
    });

    const [priceData, setPriceData] = useState({
        dateprix: new Date().toISOString().split("T")[0],
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

    const handleOptionChange = (event) => {
        const selectedTypeId = event.target.value;
        setSelectedOption(selectedTypeId);
        setProductData((prev) => ({ ...prev, type_id: selectedTypeId }));
    };

    const handleInputChange = (event, setDataFunction) => {
        const { name, value } = event.target;
        setDataFunction((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleTranslationChange = (languageCode, field, value) => {
        setTranslationData((prevData) => ({
            ...prevData,
            [languageCode]: {
                ...prevData[languageCode],
                [field]: value
            }
        }));
    };

    const handlePriceChange = (event) => {
        const value = event.target.value;
        setPriceData({
            dateprix: priceData.dateprix,
            ancienPrix: Number(value),
            nouveauPrix: Number(value)
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log("Données du produit:", productData);
            console.log("Traductions du produit:", translationData);
            console.log("Prix du produit:", priceData);
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
                photoProduit: URL.createObjectURL(file) // Génère l'URL pour la prévisualisation
            }));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-8 bg-white shadow-md rounded-lg">
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

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Photo du produit</label>
                <input
                    type="file"
                    name="photoProduit"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full p-2 border border-gray-300 rounded"
                />
                {productData.photoProduit && (
                    <div className="mt-4">
                        <img
                            src={productData.photoProduit}
                            alt="Prévisualisation"
                            className="w-48 h-48 object-contain border rounded"
                        />
                    </div>
                )}
            </div>

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

            <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-4">Nom du produit et les traductions</h3>
            {["fr", "gb", "it"].map((lang) => (
                <div key={lang} className="mb-4">
                    <h4 className="text-md font-bold text-gray-700 mb-2">Langue : {lang.toUpperCase()}</h4>
                    <input
                        type="text"
                        placeholder={`Nom du produit (${lang.toUpperCase()})`}
                        value={translationData[lang].nomProduit}
                        onChange={(e) => handleTranslationChange(lang, "nomProduit", e.target.value)}
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

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Prix du produit</label>
                <input
                    type="number"
                    name="ancienPrix"
                    placeholder="Prix du produit"
                    value={priceData.ancienPrix}
                    onChange={handlePriceChange}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>

            <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">
                Créer le Produit
            </button>
        </form>
    );
};

export default CreateProduct;

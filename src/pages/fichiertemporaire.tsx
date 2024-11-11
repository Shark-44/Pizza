import { useState } from 'react';
import useFetchProducts from '../hooks/useFetchProducts';
import { Plus, Minus } from "lucide-react";

type UpdatedPrices = {
    [key: number]: number;
};

const UpdatePrice = () => {
    const { products, error } = useFetchProducts();
    const [updatedPrices, setUpdatedPrices] = useState<UpdatedPrices>({});

    const handlePriceChange = (productId: number, delta: number) => {
        setUpdatedPrices((prevPrices) => {
            // Conversion en nombre explicite
            const currentPrice = prevPrices[productId] ?? Number(products.find(product => product.id === productId)?.nouveauPrix) ?? 0;
            return { ...prevPrices, [productId]: currentPrice + delta };
        });
    };

    const updatePrice = async (productId: number, newPrice: number) => {
        try {
            const response = await fetch(`yourApiUrl/products/${productId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nouveauPrix: newPrice }),
            });
            if (!response.ok) {
                throw new Error('Erreur lors de la mise à jour du prix');
            }
            console.log(`Prix du produit ${productId} mis à jour avec succès !`);
        } catch (error) {
            console.error('Erreur lors de l\'envoi du prix mis à jour:', error);
        }
    };

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="min-h-screen p-16 pt-28">
            <div className="overflow-x-auto">
                <table className="w-full">
                <thead>
                    <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left">Nom Produit</th>
                        <th className="px-6 py-3 text-right">Prix Actuel</th>
                        <th className="px-6 py-3 text-center">Nouveau Prix</th>
                    </tr>
                </thead>
                    <tbody>
                        {products.map((product) => {
                            // S'assurer que currentPrice est un nombre
                            const currentPrice = updatedPrices[product.id] ?? Number(product.nouveauPrix) ?? 0;

                            return (
                                <tr key={product.id} className="border-t">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-4">
                                            <span className="font-medium">{product.nomproduit}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                    <button
                                                id={`decrease-${product.id}`}
                                                onClick={() => handlePriceChange(product.id, -1)}
                                                className="p-1 rounded hover:bg-gray-100"
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                        {Number(product.nouveauPrix || 0).toFixed(2)} €
                                        <button
                                                onClick={() => handlePriceChange(product.id, 1)}
                                                className="p-1 rounded hover:bg-gray-100"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center space-x-2">

                                            <span className="px-4">{currentPrice.toFixed(2)} €</span>

                                            <button
                                                onClick={() => updatePrice(product.id, currentPrice)}
                                                className="ml-2 p-1 rounded bg-blue-500 text-white"
                                            >
                                                Mettre à jour
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UpdatePrice;
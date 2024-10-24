
import { Product, Basket } from '../../types/types';

interface ProductCardProps {
    product: Product; 
}

function ProductCard({ product }: ProductCardProps) {
    const API_URL = import.meta.env.VITE_BACKEND_URL

    const handleAdd = (productId: number) => {
    console.log("pour ajouter l'id produit en commande")
    };
    return (
<div className="bg-white shadow-md rounded-lg p-4 m-2 flex-col justify-between "
 onClick={() => handleAdd(product.id)}>
    <h2 className="font-dancing text-3xl font-semibold mb-2 text-center">{product.nomproduit}</h2>
    <img
        src={API_URL + product.photoProduit}
        alt={product.nomproduit}
        className="w-full h-58 object-cover mb-2"
    />
    <p className="font-dancing text-2xl text-gray-700 flex-grow ml-3">{product.descriptionProduit}</p>
</div>


    );
}
  
  export default ProductCard;